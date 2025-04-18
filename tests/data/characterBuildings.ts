import { scenes } from "./scenes";
import { users } from "./users";

export const characterBuildings = [
  {
    id: "56ad5bbc-a5c6-414f-889a-58ffbea87b60",
    metadata: {
      createdAt: "2025-03-25T04:22:53.567Z",
      createdBy: "user1742874960323",
      updatedAt: "2025-03-25T04:22:53.567Z",
      updatedBy: "user1742874960323",
    },
    character: {
      id: "c9cca7d-e89d-4387-b7ca-ee0cb68c5e78",
      name: "Test Character",
    },
    scene: scenes[0],
    center: "mental",
    sceneCircumstances:
      "Iste eum cumque omnis omnis non perspiciatis deserunt.",
    previousCircumstances: "Sed fuga esse.",
    startingPoint: "Test Starting Point",
    actionUnits: [
      {
        id: "6ceed574-c83d-4742-8c6e-e3a35939cc6f",
        action: "Test Action 1",
        strategies: ["Strategy 1"],
      },
      {
        id: "026fe12d-72e2-4ffd-a45a-0179f78fce63",
        action: "Test Action 2",
        strategies: ["Strategy 2"],
      },
    ],
    actor: users[0],
    relationshipCircumstances: [
      {
        character: {
          id: "242792dc-9db4-4ec8-9e35-31a48894be57",
          name: "Another Character",
        },
        circumstance: "Circumstance 2",
      },
    ],
  },
];
