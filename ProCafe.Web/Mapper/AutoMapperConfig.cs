using AutoMapper;

namespace LanaResto.ViewModels.MapperVm
{
    public class AutoMapperConfig
    {
        public static void Init()
        {
            //config your mappings here - you can map your business models to your viewmodels 
            Mapper.Initialize(cfg =>
            {
                //cfg.CreateMap<ClassA, ClassB>();
                //cfg.CreateMap<ClassC, ClassD>();
            });
            Mapper.Instance.ConfigurationProvider.AssertConfigurationIsValid();
        }
    }
}
