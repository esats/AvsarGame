using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AvsarGame.API.Models;
using AvsarGame.Core;
using AvsarGame.Portal.Helpers;
using Newtonsoft.Json;

namespace AvsarGame.Portal.Core
{
    public static class PageHelper
    {
        public static string GetModalId(string key, Guid id)
        {
            var modalId = key + id;
            return modalId;
        }

        public static string GetModalId(string key, int id)
        {
            var modalId = key + id;
            return modalId;
        }

        public static string Description(Enum value)
        {
            // get attributes  
            var field = value.GetType().GetField(value.ToString());
            var attributes = field.GetCustomAttributes(false);

            // Description is in a hidden Attribute class called DisplayAttribute
            // Not to be confused with DisplayNameAttribute
            dynamic displayAttribute = null;

            if (attributes.Any())
            {
                displayAttribute = attributes.ElementAt(0);
            }

            // return description
            return displayAttribute?.Description ?? "Description Not Found";
        }

        public static bool IsAutgenticate()
        {
            var token = SessionManager.Instance.Get("bearer");
            return token != null;
        }

        public static string GetOrderStatusStyle(int status)
        {
            if (status == 0)
            {
                return "yellow";
            }

            if (status == 1)
            {
                return "green";
            }
            else
            {
                return "red";
            }
        }

        public static string GetAddversimentStatusStyle(int status)
        {
            if (status == 0)
            {
                return "yellow";
            }

            if (status == 1)
            {
                return "green";
            }
            else
            {
                return "red";
            }
        }

        public static string GetLoggedProfileStyle()
        {
            return SessionManager.Instance.IsAuthenticate() ? "dropdown-menu" : "";
        }

        public static string GetImageUrl(string imageUrl, ImageFolder folder)
        {
            string storageUrl = "https://anatoliagm.blob.core.windows.net/uploads/";
            return storageUrl + Description(folder) + "/" + imageUrl;
        }

        public static string GetAddversimentHref(AddversimentType itemDetailType, int itemId)
        {
            switch ((int)itemDetailType)
            {
                case 1:
                    return "/ilan/knight-cyber-ring/detay/" + itemId;
                case 2:
                    return "/ilan/knight-item/detay/" + itemId;
            }

            return "";
        }

        public static string GetAddversimentUpdateHref(AddversimentType itemDetailType, int itemId)
        {
            switch ((int)itemDetailType)
            {
                case 1:
                    return UrlExtension.FriendlyUrl(SessionManager.Instance.GetFullName()) + "/knight-cyber-ring/duzenle/" + itemId;
                case 2:
                    return UrlExtension.FriendlyUrl(SessionManager.Instance.GetFullName()) + "/knight-item/duzenle/" + itemId;
            }

            return "";
        }

        public static string GetAddversimentDeleteHref(AddversimentType itemDetailType, int itemId)
        {
            switch ((int)itemDetailType)
            {
                case 1:
                    return "/knight-cyber-ring/delete/" + itemId;
                case 2:
                    return "/knight-item/delete/" + itemId;
            }

            return "";
        }

        public static string GetAddversimentBreadCumbHref(AddversimentType itemDetailType)
        {
            switch ((int)itemDetailType)
            {
                case 1:
                    return "/ilanlar/knight-cyber-rings/";
                case 2:
                    return "ilanlar/knight-items/";
            }

            return "";
        }

        public static string GetSeoName()
        {
            return SessionManager.Instance.GetSeoName();
        }

        public static decimal GetBalance()
        {
            var id = SessionManager.Instance.GetUserId();
            return JsonConvert.DeserializeObject<UserBalanceModel>(UiRequestManager.Instance.Get(String.Format("UserBalance/GetBalance/{0}", id))).Balance;
        }
    }
}