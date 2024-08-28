import { configureStore } from "@reduxjs/toolkit";
import signupSlice, { signupUser } from "../slices/signupSlice";
import axios from "axios";
import { describe, it, expect, beforeEach, vi } from "vitest";


// Mock axios
vi.mock("axios");

describe("signupSlice", () => {
  const initialState = {
    user: null,
    token: null,
    status: "idle",
    error: null,
  };

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { signup: signupSlice },
    });
  });

  it("should return the initial state", () => {
    expect(store.getState().signup).toEqual(initialState);
  });

  it("should handle signupUser.pending", () => {
    store.dispatch(signupUser.pending());
    expect(store.getState().signup.status).toEqual("loading");
    expect(store.getState().signup.error).toBeNull();
  });

  it("should handle signupUser.fulfilled", async () => {
    const mockUser = { user: { id: 1, name: "John Doe" }, token: "12345" };
    axios.post.mockResolvedValueOnce({ data: mockUser });

    await store.dispatch(signupUser({}));

    const state = store.getState().signup;
    expect(state.status).toEqual("succeeded");
    expect(state.user).toEqual(mockUser.user);
    expect(state.token).toEqual(mockUser.token);
    expect(state.error).toBeNull();
  });

  it("should handle signupUser.rejected", async () => {
    const mockError = { message: "Signup failed" };
    axios.post.mockRejectedValueOnce({ response: { data: mockError } });

    await store.dispatch(signupUser({}));

    const state = store.getState().signup;
    expect(state.status).toEqual("failed");
    expect(state.error).toEqual(mockError.message);
  });
});
