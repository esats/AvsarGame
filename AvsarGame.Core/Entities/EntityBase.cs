using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Core.Entities
{
    public class EntityBase<Type> : IEntity
    {
        public Type Id { get; set; }
        public virtual Guid? CreatedBy { get; set; }    
        public virtual DateTime? CreatedDate { get; set; }
        public virtual Guid? ModifiedBy { get; set; }
        public virtual DateTime? ModifiedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
