export interface ListResponse<T> {
  content: T;
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

export interface CompanyDTO {
  id?: number;
  name: string;
  domain: string;
  address: string;
  phone: string;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  active: boolean;
}

export interface Company {
  id: number;
  name: string;
  domain: string;
  address: string;
  phone: string;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  active: boolean;
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  superAdmin: boolean;
  companyId: number;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: number;
  name: string;
  displayName: string;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
  description: string;
  actionType: string;
  displayName: string;
  resource: string;
}
