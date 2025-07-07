#include <napi.h>

Napi::Value Sum(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::TypeError::New(env, "Expected two number arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  double arg0 = info[0].As<Napi::Number>().DoubleValue();
  double arg1 = info[1].As<Napi::Number>().DoubleValue();
  double sum = arg0 + arg1;

  return Napi::Number::New(env, sum);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "sum"), Napi::Function::New(env, Sum));
  return exports;
}

NODE_API_MODULE(SumAddon, Init)
