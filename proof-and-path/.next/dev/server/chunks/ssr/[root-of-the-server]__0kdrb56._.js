module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/components/providers/AppProviders.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders,
    "useDemoCaseContext",
    ()=>useDemoCaseContext,
    "useLargeTextContext",
    ()=>useLargeTextContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useLargeText$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/hooks/useLargeText.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const DEMO_CASE = {
    id: "demo-case-1",
    title: "Wrong size — jeans, Kmart",
    status: "gathering_evidence",
    statusLabel: "Gathering evidence",
    productServiceType: "product",
    item: "A pair of jeans",
    retailer: "Kmart",
    when: "3 weeks ago",
    method: "In store",
    location: "VIC",
    whatHappened: "Bought the wrong size and would like to exchange or return them. I can't find my receipt.",
    outcome: "Replacement",
    intakeStep: 4,
    currentProgressStep: "gather",
    nextAction: "Add proof of purchase",
    dueDate: "Friday 28 August",
    createdAt: "2026-08-20T00:00:00.000Z",
    updatedAt: "2026-08-24T00:00:00.000Z"
};
const DEMO_EVIDENCE = [
    {
        id: "receipt",
        name: "Receipt or order confirmation",
        level: "Needed",
        why: "Shows what you bought, when, and from where.",
        status: "missing"
    },
    {
        id: "altproof",
        name: "Alternative proof of purchase (bank statement, packaging, loyalty account)",
        level: "Needed",
        why: "Can help show your purchase even without a receipt.",
        status: "missing"
    },
    {
        id: "photo",
        name: "Photo of the item",
        level: "Useful",
        why: "Shows the item and the size issue.",
        status: "confirmed"
    },
    {
        id: "tag",
        name: "Photo of the size label or tag",
        level: "Useful",
        why: "Confirms the size you received.",
        status: "confirmed"
    },
    {
        id: "correspondence",
        name: "Previous messages with the store",
        level: "Optional",
        why: "Useful if you've already contacted Kmart about this.",
        status: "not_added"
    }
];
const DEMO_PERMISSIONS = {
    view: true,
    edit: true,
    upload: true,
    export: false
};
const LargeTextContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const DemoCaseContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function useLargeTextContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LargeTextContext);
    if (!context) {
        throw new Error("useLargeTextContext must be used within AppProviders");
    }
    return context;
}
function useDemoCaseContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(DemoCaseContext);
    if (!context) {
        throw new Error("useDemoCaseContext must be used within AppProviders");
    }
    return context;
}
function AppProviders({ children }) {
    const largeText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$hooks$2f$useLargeText$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLargeText"])();
    const demoCaseValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            demoCase: DEMO_CASE,
            evidence: DEMO_EVIDENCE,
            permissions: DEMO_PERMISSIONS
        }), []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LargeTextContext.Provider, {
        value: largeText,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DemoCaseContext.Provider, {
            value: demoCaseValue,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column"
                },
                children: children
            }, void 0, false, {
                fileName: "[project]/components/providers/AppProviders.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/providers/AppProviders.tsx",
            lineNumber: 125,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/providers/AppProviders.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/hooks/useLargeText.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLargeText",
    ()=>useLargeText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
const STORAGE_KEY = "proof-and-path-large-text";
function readStoredLargeText() {
    if ("TURBOPACK compile-time truthy", 1) {
        return false;
    }
    //TURBOPACK unreachable
    ;
}
function applyLargeTextAttribute(enabled) {
    if (typeof document === "undefined") {
        return;
    }
    document.documentElement.dataset.largeText = enabled ? "true" : "false";
}
const listeners = new Set();
function subscribe(listener) {
    listeners.add(listener);
    const onStorage = (event)=>{
        if (event.key === STORAGE_KEY) {
            listener();
        }
    };
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return ()=>{
        listeners.delete(listener);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    };
}
function getSnapshot() {
    const stored = readStoredLargeText();
    applyLargeTextAttribute(stored);
    return stored;
}
function getServerSnapshot() {
    return false;
}
function setStoredLargeText(enabled) {
    try {
        localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch  {
    // Ignore storage failures (private browsing, quota, etc.)
    }
    applyLargeTextAttribute(enabled);
    listeners.forEach((listener)=>listener());
}
function useLargeText() {
    const largeText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, getServerSnapshot);
    const setLargeText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((enabled)=>{
        setStoredLargeText(enabled);
    }, []);
    const toggleLargeText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setStoredLargeText(!readStoredLargeText());
    }, []);
    return {
        largeText,
        isReady: ("TURBOPACK compile-time value", "undefined") !== "undefined",
        setLargeText,
        toggleLargeText
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0kdrb56._.js.map