(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/loading.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// app/loading.tsx
// Global route‑segment loader for Next.js App Router
// Displays a full‑page load mask using TailwindCSS, ShadCN primitives & Lucide icon.
__turbopack_context__.s({
    "default": (()=>Loading)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Loading() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-muted/50"
    }, void 0, false, {
        fileName: "[project]/src/app/loading.tsx",
        lineNumber: 9,
        columnNumber: 9
    }, this);
} /*
 * Notes / Usage
 * ───────────────────────────────────────────────────────────────────────────
 * 1. Place this file at `app/loading.tsx` (or inside any route segment) and
 *    Next‑JS will automatically show it while the parallel route server code
 *    or client components hydrate.
 * 2. Tailwind utility `animate-fade-in` expects the following in globals:
 *      @keyframes fade-in { from {opacity:0} to {opacity:1} }
 *      .animate-fade-in { @apply motion-safe:animate-[fade-in_0.4s_ease-in]; }
 * 3. Replace `/newco_logo.png` with your own asset or remove <Image /> if not needed.
 */ 
_c = Loading;
var _c;
__turbopack_context__.k.register(_c, "Loading");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_loading_tsx_9a4bce6e._.js.map