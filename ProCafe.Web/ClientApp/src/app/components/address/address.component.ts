/// <reference types="@types/googlemaps" />
import { ElementRef, ViewChild, Component, NgZone, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AgmCoreModule, AgmMarker, AgmCircle, AgmInfoWindow, AgmMap, MapsAPILoader } from '@agm/core';
import { countries, regions, State, Country, Region } from "typed-countries"; //const countries = require("typed-countries").countries;
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { Address } from "../../models/address.model"; //"ngx-google-places-autocomplete/objects/address";
import PlaceResult = google.maps.places.PlaceResult;
//import { } from "googlemaps";

@Component({
  selector: 'app-address',
  templateUrl: 'address.component.html',
  styleUrls: ['address.component.css']
})
export class AddressComponent implements OnInit
{
  currentLat: any;
  currentLong: any;

  get countries()
  {
    return countries;
  }

  //TODO: states per country
  get states() {
    const list = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
      'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
      'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
      'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW',
      'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA',
      'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];
    return list;
  }

  //searchCountry = addressGroup.country
  filteredCountries: Country[];

  filterCountry() {
    let searchCountry = this.addressGroup.country;
    if (this.countries)
      //this.filteredCountries = this.filter(this.countries);
      this.filteredCountries = this.countries.filter(c => c.name.toLowerCase().includes(searchCountry));
  }

  @Input()
  public addressGroup: Address = new Address(); // get address outside (parent control)
  addressStr: PlaceResult | string; //address string in search input

 //@Output() public onComplete: EventEmitter<any> = new EventEmitter();

  //1. ========Init GMap with current position =========

  @ViewChild('gmap', {static: true})
  gmapElement: any;

  map: google.maps.Map;
  marker: google.maps.Marker;

  isTracking: boolean = true;

  constructor(private mapsAPILoader: MapsAPILoader, private zone: NgZone) {
  }

  ngOnInit()
  {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //Create Google Map
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    //Init search address box
    this.initAutocomplete();

    //Display current location on the GMap
    this.findMe();
  }

  findMe()
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position) =>
      {
        this.showPositionOnMap(position);
      });
    }
    else
    {
      alert("Geolocation is not supported by this browser.");
    }
  }

  trackMe()
  {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showPositionOnMap(position);
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  navigatePositionOnMap(location: LatLng)
  {
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you here !'
      });
    }
    else {
      this.marker.setPosition(location);

      /*
      var circle = new google.maps.Circle({
        center: location,
        radius: position.coords.accuracy
      });
      this.autocomplete.setBounds(circle.getBounds());*/
    }

    //NOTE: REFRESH search address string, and filling address parts
    this.getAddressFromCoordinates(location);
  }

  showPositionOnMap(position : Position)
  {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.navigatePositionOnMap(location);
  }

  getAddressFromCoordinates(latlng: LatLng) : string
  {
    let addrStr : string = "empty";
    if (navigator.geolocation)
    {
      var geocoder = new google.maps.Geocoder();
      var infowindow = new google.maps.InfoWindow;

      let request = { 'location': latlng };//let latlng = new google.maps.LatLng(lat, lng);

      let that = this;
      //this.zone.run(() => {
      geocoder.geocode(request, (results, status) =>
      {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;

          if (result != null)
          {
            //that.zoom = 11;
            addrStr = result.formatted_address;

            that.addressStr = addrStr; //IF automaticatically set your current location

            that.addressGroup.zipCode = rsltAdrComponent[resultLength - 1].long_name;
            that.addressGroup.country = resultLength >= 2 ? rsltAdrComponent[resultLength - 2].long_name : "";
            //that.addressGroup.distict = rsltAdrComponent[resultLength - 5].short_name;
            that.addressGroup.city = resultLength >= 4 ? rsltAdrComponent[resultLength - 4].long_name : "";
            that.addressGroup.street = resultLength >= 7 ? rsltAdrComponent[resultLength - 6].short_name + ", " + rsltAdrComponent[resultLength - 7].short_name : "";
            //this.marker.buildingNum = rsltAdrComponent[resultLength - 8].short_name;
          }
        }
      });
    }
    return addrStr;
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  setCenter(e: any) {
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.currentLat, this.currentLong));
  }

  //2 ====AUTO-COMPLETE ADDRESS from search box ===

  @ViewChild('autocompleteAddr', { static: true })
  autocompleteAddr: ElementRef;
  autocomplete: google.maps.places.Autocomplete;

  @Output()
  onChangeSearchAddress: EventEmitter<PlaceResult | string | null> = new EventEmitter<PlaceResult | string | null>();

  // Create the autocomplete object, restricting the search to geographical location types.
  initAutocomplete()
  {
    var options = {
      types: ['address']//'geocode','geometry', 'bar', 'point_of_interest'],
      //bounds: defaultBounds,
      //strictBounds : true,
      //placeIdOnly: true,
      //libraries: ['places'],
      //componentRestrictions: {country: 'ua'}
    };

    //Set autocomplete place on the map
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.autocompleteAddr.nativeElement);

    //this.mapsAPILoader.load().then(() => {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteAddr.nativeElement, options);
    this.autocomplete.bindTo('bounds', this.map);
    //google.maps.event.clearInstanceListeners(this.autocompleteAddr.nativeElement);
     this.autocomplete.addListener('place_changed', this.fillInAddressFromSearchStr);//populate the address fields in the form on user input
  }

  public onQueryAddress(event: any)
  {
    //this.onChangeSearchAddress.emit(this.addressStr);
    this.fillInAddressFromSearchStr();
  }

  fillInAddressFromSearchStr()
  {
    // Get the place details from the autocomplete object.
    let searchPlace: PlaceResult = this.autocomplete.getPlace();

    // place is not valid
    if (!searchPlace.geometry || !searchPlace.place_id) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    if (searchPlace.geometry.viewport) {
      this.map.fitBounds(searchPlace.geometry.viewport);
    }
    else
    {
      this.map.setCenter(searchPlace.geometry.location);
      this.map.setZoom(16);
    }
    //this.addressStr = searchPlace.formatted_address;

    //Navigate to entered in search box position on GMaps
    this.navigatePositionOnMap(searchPlace.geometry.location);

    //Retrieve\split address into pieces=> fill up ADDRESS fields from search string
    for (var i = 0; i < searchPlace.address_components.length; i++) {
        for (var j = 0; j < searchPlace.address_components[i].types.length; j++) {
          let addrPart = searchPlace.address_components[i].types[j];
          let addrPartVal = searchPlace.address_components[i].long_name;
          switch (addrPart) {
            case "postal_code":
              this.addressGroup.zipCode = addrPartVal;
              break;
            case "country":
              this.addressGroup.country = addrPartVal;
              break;
            case "street_address":
              this.addressGroup.street = addrPartVal;
              break;
          }
        }
      }
  }
}
