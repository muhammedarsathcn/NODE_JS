import {
  assignBuddies,
  fetchAllUsers,
  deleteUser,
} from "../src/services/admin.service.js";
import User from "../src/schemas/user.schema.js";
import AppError from "../src/errors/AppError.js";

jest.mock("../src/schemas/user.schema.js");

describe("User Service Tests", () => {
  // clear mocks after each test
  afterEach(() => jest.clearAllMocks());

 

  describe("fetchAllUsers()", () => {
    // test fetching all users with populated buddies
    it("should return all users with buddies populated", async () => {
      const users = [{ name: "User1" }, { name: "User2" }];
      User.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(users),
      });
      const result = await fetchAllUsers();
      expect(result).toEqual({
        message: "All users fetched successfully",
        data: users,
        statusCode: 200,
      });
    });
  });

  describe("deleteUser()", () => {
    // test user not found before deletion
    it("should throw error if user does not exist", async () => {
      User.findById.mockResolvedValue(null);
      await expect(deleteUser("user1")).rejects.toThrow("User is not existed");
    });

    // test successful user deletion and cleanup from buddies list
    it("should delete user successfully", async () => {
      const mockUser = { _id: "user1" };
      User.findById.mockResolvedValue(mockUser);
      User.updateMany.mockResolvedValue({});
      User.findByIdAndDelete.mockResolvedValue({});
      const result = await deleteUser("user1");
      expect(User.updateMany).toHaveBeenCalledWith(
        { buddies: "user1" },
        { $pull: { buddies: "user1" } },
      );
      expect(User.findByIdAndDelete).toHaveBeenCalledWith("user1");
      expect(result).toEqual({
        message: "User deleted successfully",
        statusCode: 200,
      });
    });
  });
});
