using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AvsarGame.Portal.Core {
    public static class PageHelper {
        public static string GetModalId(string key,Guid id) {
            var modalId = key + id;
            return modalId;
        }
        public static string GetModalId(string key,int id) {
            var modalId = key + id;
            return modalId;
        }

        public static string Description(Enum value) {
            // get attributes  
            var field = value.GetType().GetField(value.ToString());
            var attributes = field.GetCustomAttributes(false);

            // Description is in a hidden Attribute class called DisplayAttribute
            // Not to be confused with DisplayNameAttribute
            dynamic displayAttribute = null;

            if (attributes.Any()) {
                displayAttribute = attributes.ElementAt(0);
            }

            // return description
            return displayAttribute?.Description ?? "Description Not Found";
        }

        public static string DisplayStyle(string state) {
            var token = SessionManager.Instance.Get("bearer");
            if (token == null) {
                if (state == "login") {
                     return "block";
                }
                return "none";
            } else {
                if (state == "logged") {
                    return "block";
                }
                return "none";
            }

        }

        public static string GetOrderStatusStyle(int status) {
            if (status==0) {
                return "yellow";
            }

            if (status==1) {
                return "green";

            } else {
                return "red";
            }
        }

        public static string GetLoggedProfileStyle() {
            return SessionManager.Instance.IsAuthenticate() ? "dropdown-menu": "";
        }
    }
}