using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.DataAccess
{
    public class DeviceConfiguration : IEntityTypeConfiguration<Device>
    {
        public void Configure(EntityTypeBuilder<Device> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(d => d.CreateAt)
                .IsRequired();

            builder.Property(d => d.LastUpdatedConnected)
               .IsRequired();

            builder.Property(d => d.ContractName)
               .IsRequired();

            builder.Property(d => d.ContractId)
               .IsRequired();

            builder.Property(d => d.Address)
               .IsRequired();

            builder.Property(d => d.IpAddress)
               .IsRequired();

            builder.Property(d => d.MacAddress)
               .IsRequired();

            builder.Property(d => d.Note)
               .IsRequired();

            builder.Property(d => d.IsConnected)
               .IsRequired();

            builder.Property(d => d.IsConnectedOld)
               .IsRequired();

            builder.Property(d => d.PercentageOffline)
               .IsRequired();

            builder.Property(d => d.Log)
               .IsRequired();
        }
    }
}
