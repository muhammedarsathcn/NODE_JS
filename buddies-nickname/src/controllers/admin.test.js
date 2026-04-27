import { jest } from "@jest/globals";

/*
===========================
Mock service layer
===========================
*/

const mockAssignBuddies = jest.fn();
const mockFetchAllUsers = jest.fn();
const mockDeleteUser = jest.fn();

jest.unstable_mockModule("../services/admin.service.js", () => ({
  assignBuddies: mockAssignBuddies,
  fetchAllUsers: mockFetchAllUsers,
  deleteUser: mockDeleteUser,
}));

/*
===========================
Mock logger
===========================
*/

jest.unstable_mockModule("../configs/logger.config.js", () => ({
  default: {
    error: jest.fn(),
  },
}));

/*
===========================
Mock success response middleware
===========================
*/

const mockSuccessResponse = jest.fn();

jest.unstable_mockModule(
  "../middlewares/globalResponse.middleware.js",
  () => ({
    successResponse: mockSuccessResponse,
  })
);

/*
===========================
Import AFTER mocking
===========================
*/

const {
  buddyAssigning,
  getAllUsers,
  userDelete,
} = await import("./admin.controller.js");

describe("Admin Controller Tests", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { body: {} };
    res = {};
    next = jest.fn();

    jest.clearAllMocks();
  });

  /*
  ===========================
  buddyAssigning tests
  ===========================
  */

  test("should assign buddy successfully", async () => {
    req.body = {
      userId: "123",
      buddyId: "456",
    };

    mockAssignBuddies.mockResolvedValue({
      message: "Buddy assigned",
      statusCode: 200,
    });

    await buddyAssigning(req, res, next);

    expect(mockAssignBuddies).toHaveBeenCalledWith("123", "456");

    expect(mockSuccessResponse).toHaveBeenCalledWith(
      res,
      "Buddy assigned",
      200
    );
  });

  test("should throw error if ids missing", async () => {
    req.body = {};

    await buddyAssigning(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  /*
    getAllUsers tests
  */

  test("should fetch all users successfully", async () => {
    mockFetchAllUsers.mockResolvedValue({
      message: "Users fetched",
      data: [],
      statusCode: 200,
    });

    await getAllUsers(req, res, next);

    expect(mockFetchAllUsers).toHaveBeenCalled();

    expect(mockSuccessResponse).toHaveBeenCalledWith(
      res,
      "Users fetched",
      [],
      200
    );
  });

  /*
  ===========================
  userDelete tests
  ===========================
  */

  test("should delete user successfully", async () => {
    req.body = {
      userId: "123",
    };

    mockDeleteUser.mockResolvedValue({
      message: "User deleted",
      statusCode: 200,
    });

    await userDelete(req, res, next);

    expect(mockDeleteUser).toHaveBeenCalledWith("123");

    expect(mockSuccessResponse).toHaveBeenCalledWith(
      res,
      "User deleted",
      200
    );
  });

  test("should throw error if userId missing", async () => {
    req.body = {};
    await userDelete(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});