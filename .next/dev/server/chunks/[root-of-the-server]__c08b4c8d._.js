module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/tinylink/TinyLink/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLink",
    ()=>createLink,
    "deleteLink",
    ()=>deleteLink,
    "getLinkByCode",
    ()=>getLinkByCode,
    "getLinks",
    ()=>getLinks,
    "incrementClick",
    ()=>incrementClick,
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const prisma = global.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) global.prisma = prisma;
const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;
function genCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let s = '';
    for(let i = 0; i < length; i++)s += chars[Math.floor(Math.random() * chars.length)];
    return s;
}
function ensureValidUrl(url) {
    try {
        // allow relative? spec requires full URL — validate absolute only
        const u = new URL(url);
        return u.toString();
    } catch  {
        throw new Error('INVALID_URL');
    }
}
async function createLink({ url, code }) {
    const safeUrl = ensureValidUrl(url);
    let finalCode = code?.trim();
    if (finalCode) {
        if (!CODE_REGEX.test(finalCode)) throw new Error('INVALID_CODE');
        const existing = await prisma.link.findUnique({
            where: {
                code: finalCode
            }
        });
        if (existing) throw new Error('CODE_EXISTS');
    } else {
        // generate until unique (rare collision)
        let attempts = 0;
        do {
            finalCode = genCode(6);
            const exists = await prisma.link.findUnique({
                where: {
                    code: finalCode
                }
            });
            if (!exists) break;
            attempts++;
        }while (attempts < 5)
    }
    const created = await prisma.link.create({
        data: {
            code: finalCode,
            url: safeUrl
        }
    });
    return created;
}
async function getLinks() {
    return prisma.link.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
}
async function getLinkByCode(code) {
    return prisma.link.findUnique({
        where: {
            code
        }
    });
}
async function deleteLink(code) {
    // will throw if not found
    return prisma.link.delete({
        where: {
            code
        }
    });
}
async function incrementClick(code) {
    return prisma.link.update({
        where: {
            code
        },
        data: {
            clicks: {
                increment: 1
            },
            lastClicked: new Date()
        }
    });
}
;
}),
"[project]/tinylink/TinyLink/app/api/links/[code]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tinylink/TinyLink/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/tinylink/TinyLink/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET(request, { params }) {
    const { code } = await params; // <- unwrap Promise
    if (!code) return __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Missing code"
    }, {
        status: 400
    });
    const link = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLinkByCode"])(code);
    if (!link) return __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Not found"
    }, {
        status: 404
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(link);
}
async function DELETE(request, { params }) {
    const { code } = await params; // <- unwrap Promise
    if (!code) return __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Missing code"
    }, {
        status: 400
    });
    try {
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLinkByCode"])(code);
        if (!existing) return __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Not found"
        }, {
            status: 404
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteLink"])(code);
        return __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        }, {
            status: 200
        });
    } catch (err) {
        console.error("DELETE /api/links/:code error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$tinylink$2f$TinyLink$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c08b4c8d._.js.map