import { useRoutes } from "react-router-dom";
import Form from "../Form/Form";

export const useRouters = () =>{
    return useRoutes ([
        {
            element: <Form/>,
            children: [
                {
                    index: true,
                    element: <Form/>
                }
            ]
        }
    ])
}
