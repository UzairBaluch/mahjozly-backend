const getBusinessProfileService = async (userId: string) => {
  return userId;
};

const updateBusinessProfileService = async (userId: string, input: unknown) => {
  return { userId, input };
};
export { getBusinessProfileService, updateBusinessProfileService };
