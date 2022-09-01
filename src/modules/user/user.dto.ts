export type UserDTO = {
  name: string;
  birthdate: string;
  document: string;
  acceptedTerms: boolean;
  zipcode: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
