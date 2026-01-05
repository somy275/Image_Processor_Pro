import configureStore  from "redux-mock-store";
import {screen,render,fireEvent} from "@testing-library/react"
import { Provider } from "react-redux";
import { describe, it, beforeEach, vi, expect } from "vitest";
import Applayout from "../Applayout";
import EditImage from "../EditImage";
import { MemoryRouter } from "react-router";

let cropperProps={}
vi.mock("react-easy-crop",()=>{
    return{
        default:function MockCropper(props){
cropperProps=props
return <div data-testid="cropper"/>
        }
    }
})
const mockStore=configureStore([])
describe("Edit_Image Component",()=>{
    let store;
beforeEach(()=>{
store=mockStore({
    Upload:{ OpenEditor:true, SelectedCropImage:"url1"}
})
store.dispatch=vi.fn()
})

it("shows the Edit Image modal when OpenEditor is true", () => {
  render(
    <MemoryRouter>
    <Provider store={store}>
      <Applayout />
    </Provider>
    </MemoryRouter>
  );

  expect(screen.getByText("Edit Image")).toBeInTheDocument();
  expect(screen.getByTestId("close-btn")).toBeInTheDocument();
  expect(screen.getByTestId("rotate-btn")).toBeInTheDocument();
   expect(screen.getByTestId("edit-image-modal")).toBeInTheDocument();
});

it("Shows normal image when crop mode is OFF",()=>{
    render(
        <MemoryRouter>
            <Provider store={store}>
                <EditImage/>
            </Provider>
        </MemoryRouter>
    )
  expect(screen.getByRole("img")).toBeInTheDocument()
     expect(screen.getByRole("img")).toHaveAttribute("src","url1")
       expect(screen.queryByTestId("cropper")).not.toBeInTheDocument();
})

it("Crop button toggles cropping mode",async()=>{
    render(
        <MemoryRouter>
            <Provider store={store}>
<EditImage/>
            </Provider>
        </MemoryRouter>
    )
    const cropButton = screen.getByText("Crop");
    expect(screen.getByTestId("crop-btn")).toBeInTheDocument()
     expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.queryByTestId("cropper")).not.toBeInTheDocument();
    fireEvent.click(cropButton)
     const cropper = await screen.findByTestId("cropper");
  expect(cropper).toBeInTheDocument();
    expect(screen.queryByTestId("normal-image")).not.toBeInTheDocument();
})

it("rotate button updates rotation state",()=>{
render(
    <Provider store={store}>
   <EditImage />
    </Provider>
)
let rotate=screen.getByText("Rotate")
fireEvent.click(screen.getByTestId("crop-btn"));
fireEvent.click(rotate)
expect(cropperProps.rotation).toBe(90)
fireEvent.click(rotate)
expect(cropperProps.rotation).toBe(180)
fireEvent.click(rotate)
expect(cropperProps.rotation).toBe(270)
fireEvent.click(rotate)
})

}
    )