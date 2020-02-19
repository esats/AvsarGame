using System;
using System.Collections.Generic;
using System.Text;

namespace AvsarGame.API.Base
{
    public interface IResponse
    {
        bool IsSuccess { get; set; }
        string Message { get; set; }
        Exception Exception { get; set; }
    }
}
