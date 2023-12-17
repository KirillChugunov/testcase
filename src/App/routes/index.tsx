import TodoTablePage from "../../pages/todoTablePage";
import {Route, Routes} from "react-router-dom";
import ErrorPage from "../../pages/errorPage";
import {page} from "../../shared/constants/navigation";
import NotFound from "../../pages/notFoundPage/notFoundPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={page.mainPage} element={<TodoTablePage/>}/>
            <Route path={page.errorPage} element={<ErrorPage/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}

export default AppRoutes