import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectProjectById } from "../entities/project/projectSlice";
import { Project } from "../app/types";
export const projectLoader = (): Project => {
  const { projectId } = useParams();
  try {
    return useAppSelector((state) => {
      if (!projectId) {
        console.error('Error in projectLoader:', 'projectId is undefined');
        throw new Response("Not Found", { status: 404 });
      };
      return selectProjectById(state, projectId);
    });
  } catch (error) {
    console.error('Error in projectLoader:', error);
    throw new Response("Not Found", { status: 404 });
  }
    
};