"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
    division_id: z.number().optional(),
    division_code: z.string().min(1),
    division: z.string().min(1),
    vendor_name: z.string().optional(),
    organization_name: z.string().optional(),
});

type Payload = z.infer<typeof schema>;
const API = process.env.API_BASE_URL!;           // e.g. http://localhost:8000/api

async function api(url: string, init: RequestInit = {}) {
    const r = await fetch(url, { ...init, headers: { "Content-Type": "application/json" }, cache: "no-store" });
    if (!r.ok) throw new Error(await r.text());
}

export async function createDivision(p: Payload) {
    await api(`${API}/divisions`, { method: "POST", body: JSON.stringify(schema.parse(p)) });
    revalidatePath("/divisions");
}

export async function editDivision(id: number, p: Payload) {
    await api(`${API}/divisions/${id}`, { method: "PUT", body: JSON.stringify(schema.parse(p)) });
    revalidatePath("/divisions");
}

export async function deleteDivision(id: number) {
    await api(`${API}/divisions/${id}`, { method: "DELETE" });
    revalidatePath("/divisions");
}
