using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.Portal.Core {
    public static class PageHelper {
        public static string GetModalId(Guid id) {
            var modalId = "category" + id;
            return modalId;
        }
    
        public static string Description( Enum value )
        {
            // get attributes  
            var field = value.GetType().GetField( value.ToString() );
            var attributes = field.GetCustomAttributes( false );

            // Description is in a hidden Attribute class called DisplayAttribute
            // Not to be confused with DisplayNameAttribute
            dynamic displayAttribute = null;

            if (attributes.Any())
            {
                displayAttribute = attributes.ElementAt( 0 );
            }

            // return description
            return displayAttribute?.Description ?? "Description Not Found";
        }
    }
}