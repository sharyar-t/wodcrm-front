import api from "@/api.ts";
import type { Company, CompanyDTO, ListResponse } from "@/types.ts";

export const getCompanies = (page: number) =>
  api.get<ListResponse<Company>>("/api/companies", { params: { page } });

export const deleteCompany = async (id: number) => await api.delete(`/api/companies/${id}`);

export const createCompany = async (company: CompanyDTO) =>
  await api.post(`/api/companies`, company);
