import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, beforeEach, vi, expect } from "vitest";
import configureStore from "redux-mock-store";
import Preview_Img from "../Preview_Img";
import { remove, removeAll } from "../../features/Image_Upload/ImageUploadSlice";

const mockStore = configureStore([]);

describe("Preview_Img Component", () => {
  let store;
  let uploadedFiles = [
    { file: { name: "image1.jpg", size: 1024 * 1024 }, image: "url1" },
    { file: { name: "image2.png", size: 500 * 1024 }, image: "url2" },
  ];

  beforeEach(() => {
    store = mockStore({
      Upload: { Image_files: uploadedFiles },
    });

    store.dispatch = vi.fn(); // Mock dispatch
  });

  it("renders header with correct image count", () => {
    render(
      <Provider store={store}>
        <Preview_Img />
      </Provider>
    );

    expect(screen.getByText(/Uploaded Images \(2\)/i)).toBeInTheDocument();
  });

  it("renders all uploaded images with name and size", () => {
    render(
      <Provider store={store}>
        <Preview_Img />
      </Provider>
    );

    uploadedFiles.forEach((img) => {
      expect(screen.getByText(img.file.name)).toBeInTheDocument();
      const sizeText =
        (img.file.size / 1024 / 1024).toFixed(2) +
        ((img.file.size / 1024 / 1024).toFixed(2) >= 1 ? " MB" : " KB");
      expect(screen.getByText(sizeText)).toBeInTheDocument();
    });
  });

  it("dispatches removeAll when Clear All button clicked", () => {
    render(
      <Provider store={store}>
        <Preview_Img />
      </Provider>
    );

    const clearBtn = screen.getByTestId("clear-all-btn");
    fireEvent.click(clearBtn);
    expect(store.dispatch).toHaveBeenCalledWith(removeAll());
  });

  it("dispatches remove when individual delete button clicked", () => {
    render(
      <Provider store={store}>
        <Preview_Img />
      </Provider>
    );

    const deleteBtn0 = screen.getByTestId("delete-btn-0");
    fireEvent.click(deleteBtn0);
    expect(store.dispatch).toHaveBeenCalledWith(remove(0));

    const deleteBtn1 = screen.getByTestId("delete-btn-1");
    fireEvent.click(deleteBtn1);
    expect(store.dispatch).toHaveBeenCalledWith(remove(1));
  });

  it("hover overlay exists but is initially hidden", () => {
    render(
      <Provider store={store}>
        <Preview_Img />
      </Provider>
    );

    const editButtons = screen.getAllByText(/Edit Image/i);
    expect(editButtons.length).toBe(uploadedFiles.length);

    editButtons.forEach((btn) => {
      expect(btn.parentElement).toHaveClass("opacity-0");
    });
  });
});
