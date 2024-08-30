import axios from "axios";
import { SendContactEmail } from "./brevoEmailService";
import { handleSuccess, handleError } from "../../utils/responseHandlers";
import { IApiResponse } from "../../types";

jest.mock("axios");
jest.mock("../../utils/responseHandlers");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedHandleSuccess = handleSuccess as jest.MockedFunction<
  typeof handleSuccess
>;
const mockedHandleError = handleError as jest.MockedFunction<
  typeof handleError
>;

describe("SendContactEmail", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should send an email successfully with valid contact properties", async () => {
    const contactProperties = {
      FIRSTNAME: "proshanto",
      LASTNAME: "saha",
      email: "proshantosaha@gmail.com",
      companyWebsite: "https://proshanto.com",
      message: "This is a test message.",
      getNda: true,
      consent: true,
    };

    const expectedResponse: IApiResponse = {
      status: 200,
      message: "Email successfully sent",
      data: {},
    };

    mockedAxios.post.mockResolvedValueOnce({ data: {} });
    mockedHandleSuccess.mockReturnValueOnce(expectedResponse);

    const response = await SendContactEmail(contactProperties);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({
        subject: "New Contact Form Submission from proshanto saha",
        htmlContent: expect.any(String),
        sender: {
          email: process.env.PERSONAL_EMAIL || "",
        },
        to: [
          {
            email: process.env.PERSONAL_EMAIL || "",
          },
        ],
        replyTo: {
          email: "proshantosaha@gmail.com",
          name: "proshanto saha",
        },
      }),
      expect.any(Object)
    );
    expect(mockedHandleSuccess).toHaveBeenCalledWith(
      { data: {} },
      "Email successfully sent"
    );
    expect(response).toEqual(expectedResponse);
  });

  it("should return an error response for missing required fields", async () => {
    const contactProperties = {
      FIRSTNAME: "",
      email: "proshantosaha@gmail.com",
      consent: true,
    };

    const expectedResponse: IApiResponse = {
      status: 400,
      message:
        "Missing required fields: FIRSTNAME, email, and consent are required.",
    };

    const response = await SendContactEmail(contactProperties);
    expect(response).toEqual(expectedResponse);
  });

  it("should return an error response for invalid email format", async () => {
    const contactProperties = {
      FIRSTNAME: "Proshanto",
      LASTNAME: "Saha",
      email: "invalid-email",
      consent: true,
    };

    const expectedResponse: IApiResponse = {
      status: 400,
      message: "Invalid email format.",
    };

    const response = await SendContactEmail(contactProperties);
    expect(response).toEqual(expectedResponse);
  });

  it("should handle errors from axios request", async () => {
    const contactProperties = {
      FIRSTNAME: "Proshanto",
      LASTNAME: "Saha",
      email: "proshantosaha@gmail.com",
      consent: true,
    };

    const expectedResponse: IApiResponse = {
      status: 500,
      message: "Internal server error",
    };

    mockedAxios.post.mockRejectedValueOnce(new Error("Internal server error"));
    mockedHandleError.mockReturnValueOnce(expectedResponse);

    const response = await SendContactEmail(contactProperties);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedHandleError).toHaveBeenCalledWith(
      new Error("Internal server error")
    );
    expect(response).toEqual(expectedResponse);
  });
});
