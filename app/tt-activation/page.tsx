import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TT Activation",
  description: "TikTok activation tracking page.",
};

export default function TtActivationPage() {
  return (
    <>
      <Script
        id="tiktok-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
              ttq.setAndDefer = function (target, method) {
                target[method] = function () {
                  target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
                };
              };
              for (var i = 0; i < ttq.methods.length; i++) {
                ttq.setAndDefer(ttq, ttq.methods[i]);
              }
              ttq.instance = function (id) {
                var instance = ttq._i[id] || [];
                for (var j = 0; j < ttq.methods.length; j++) {
                  ttq.setAndDefer(instance, ttq.methods[j]);
                }
                return instance;
              };
              ttq.load = function (id, options) {
                var url = "https://analytics.tiktok.com/i18n/pixel/events.js";
                var partner = options && options.partner;
                ttq._i = ttq._i || {};
                ttq._i[id] = [];
                ttq._i[id]._u = url;
                ttq._t = ttq._t || {};
                ttq._t[id] = +new Date();
                ttq._o = ttq._o || {};
                ttq._o[id] = options || {};
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.src = url + "?sdkid=" + id + "&lib=" + t;
                var firstScript = document.getElementsByTagName("script")[0];
                firstScript.parentNode.insertBefore(script, firstScript);
              };

              ttq.load("D776VJ3C77U0VSMTBE30");
              ttq.page();
              ttq.track("CompleteRegistration");
            }(window, document, "ttq");
          `,
        }}
      />

      <main className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">TT Activation</h1>
          <p className="mt-2 text-sm text-slate-500">
            TikTok Pixel activo con PageView y CompleteRegistration.
          </p>
        </div>
      </main>
    </>
  );
}
