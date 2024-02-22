import { pubsub } from "../pubsub/pubsub";

export function acceptProject(
  projectManagerId: string,
  projectId: string,
  clientId: string
) {
  // Tu código aquí...

  // Emitir un evento cuando un Project Manager acepta un proyecto.
  pubsub.emit(`projectAccepted_${clientId}`, {
    projectManagerId,
    projectId,
    clientId,
  });
}
