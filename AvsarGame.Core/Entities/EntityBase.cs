using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.Core.Entities
{
    public class EntityBase<Type> : IEntity
    {
        public Type Id { get; set; }
        public virtual string CreatedBy { get; set; }    
        public virtual DateTime? CreatedDate { get; set; }
        public virtual string ModifiedBy { get; set; }
        public virtual DateTime? ModifiedDate { get; set; } 
        public bool IsActive { get; set; } = true;
    }
}
