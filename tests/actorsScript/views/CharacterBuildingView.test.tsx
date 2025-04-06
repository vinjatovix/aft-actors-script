import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterBuildingView } from "../../../src/actorsScript/views/CharacterBuildingView";
import { useDispatch } from "react-redux";
import { deleteCharacterBuilding, getAllCharacterBuildings, updateCharacterBuilding } from "../../../src/redux/thunks/characterBuildingThunks";
import { clearSelectedCharacterBuilding } from "../../../src/redux/slices/characterBuildingSlice";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));


const mockDispatch = jest.fn();

jest.mock('../../../src/redux/thunks/characterBuildingThunks', () => ({
    ...jest.requireActual('../../../src/redux/thunks/characterBuildingThunks'),
    deleteCharacterBuilding: jest.fn().mockResolvedValue(undefined),
    getAllCharacterBuildings: jest.fn().mockResolvedValue([]),
    updateCharacterBuilding: jest.fn().mockResolvedValue(undefined),
}));

const flushPromises = () => new Promise(resolve => process.nextTick(resolve));

const mockCharacterBuilding = {
    id: "1",
    character: { id: "1", name: "Test Character" },
    scene: {
        id: "1", description: "Test Scene", characters: [
            { id: "1", name: "Test Character" },
            { id: "2", name: "Another Character" },
        ],
    },
    metadata: {
        updatedAt: "2023-01-01",
        createdAt: "2022-12-01",
        createdBy: "Test Creator",
        updatedBy: "Test Updater"
    },
    center: "mental",
    sceneCircumstances: "Test Circumstances",
    previousCircumstances: "Previous Test Circumstances",
    additionalNotes: "Test Notes",
    startingPoint: "Test Starting Point",
    actionUnits: [
        { id: "1", action: "Test Action 1", strategies: ["Strategy 1"] },
        { id: "2", action: "Test Action 2", strategies: ["Strategy 2"] },
    ],
    actor: { id: "1", username: "Test Actor" },
    relationshipCircumstances: [
        { character: { id: "1", name: "Character 1" }, circumstance: "Circumstance 1" },
        { character: { id: "2", name: "Character 2" }, circumstance: "Circumstance 2" },
    ],
};

describe("CharacterBuildingView", () => {
    beforeEach(() => {
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        mockDispatch.mockImplementation((action) => {
            if (typeof action === "function") {
                return action(mockDispatch, () => ({
                    auth: { token: "test-token", user: { id: "1", username: "Test User" } },
                    characterBuilding: { selectedCharacterBuilding: mockCharacterBuilding },
                }));
            }
            return action;
        });
    });
    
    it("renders the CharacterBuildingHeader with correct props", () => {
        const { getByText } = render(
            <CharacterBuildingView characterBuilding={mockCharacterBuilding} />
        );

        expect(getByText(/Test Character/)).toBeInTheDocument();
        expect(getByText(/Test Scene/)).toBeInTheDocument();
    });

    it("calls handleSubmit when SaveButton is clicked", async () => {

        const { getByText } = render(
            <CharacterBuildingView characterBuilding={mockCharacterBuilding} />
        );

        fireEvent.click(getByText("Gardar"));

        await flushPromises();

        expect(mockDispatch).toHaveBeenCalledWith(updateCharacterBuilding(expect.objectContaining({
            id: mockCharacterBuilding.id,
            center: mockCharacterBuilding.center,
        })

        ));


    });

    it("calls handleDelete when Delete button is clicked", async () => {


        const mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

        const { getByText } = render(
            <CharacterBuildingView characterBuilding={mockCharacterBuilding} />
        );

        fireEvent.click(getByText("Eliminar"));

        await flushPromises();

        expect(mockDispatch).toHaveBeenNthCalledWith(1, deleteCharacterBuilding(mockCharacterBuilding.id));
        expect(mockDispatch).toHaveBeenNthCalledWith(2, clearSelectedCharacterBuilding());
        expect(mockDispatch).toHaveBeenNthCalledWith(3, getAllCharacterBuildings()); // Esto verifica que la tercera llamada es alguna función (como la acción asincrónica `getAllCharacterBuildings`)
    });

    it("updates formData when input fields change", () => {


        const { getByLabelText } = render(
            <CharacterBuildingView characterBuilding={mockCharacterBuilding} />
        );

        const input = getByLabelText("Circunstancias da Escea") as HTMLInputElement;
        fireEvent.change(input, { target: { value: "Updated Circumstances" } });

        expect(input.value).toBe("Updated Circumstances");
    });
});