import React, { lazy, Suspense } from 'react'
import { OPLoader } from './ComponentOP/OPLoader';
import { useSelector } from 'react-redux';

const OPEntry = lazy(() => import("./PagesOP/OPEntry").then(module => ({ default: module.OPEntry })));
const OPHotelEntry = lazy(() => import("./PagesOP/OPHotelEntry").then(module => ({ default: module.OPHotelEntry })));
const OPHotelUser = lazy(() => import("./PagesOP/OPHotelUser").then(module => ({ default: module.OPHotelUser })));
const OPHotelSettings = lazy(() => import("./PagesOP/OPHotelSettings").then(module => ({ default: module.OPHotelSettings })));
const OPAddEmployees = lazy(() => import("./PagesOP/OPAddEmployees").then(module => ({ default: module.OPAddEmployees })));
const OPViewEmployees = lazy(() => import("./PagesOP/OPViewEmployees").then(module => ({ default: module.OPViewEmployees })));
const OPAddBench = lazy(() => import("./PagesOP/OPAddBench").then(module => ({ default: module.OPAddBench })));
const OPViewBench = lazy(() => import("./PagesOP/OPViewBench").then(module => ({ default: module.OPViewBench })));
const OPViewMenuCard = lazy(() => import("./PagesOP/OPViewMenuCard").then(module => ({ default: module.OPViewMenuCard })));
const OPAddMenuCard = lazy(() => import("./PagesOP/OPAddMenuCard").then(module => ({ default: module.OPAddMenuCard })));
const OPHotelSignup = lazy(() => import("./PagesOP/OPHotelSignup").then(module => ({ default: module.OPHotelSignup })))
const OPHotelLogin = lazy(() => import("./PagesOP/OPHotelLogin").then(module => ({ default: module.OPHotelLogin })))
const OPEmployeeEntry = lazy(() => import("./PagesOP/OPEmployeeEntry").then(module => ({ default: module.OPEmployeeEntry })))
const OPEmployeeLogin = lazy(() => import("./PagesOP/OPEmployeeLogin").then(module => ({ default: module.OPEmployeeLogin })))
const OPEmployeeUser = lazy(() => import("./PagesOP/OPEmployeeUser").then(module => ({ default: module.OPEmployeeUser })))
const OPEmployeeSettings = lazy(() => import("./PagesOP/OPEmployeeSettings").then(module => ({ default: module.OPEmployeeSettings })))
const OPServerOrderPlacing = lazy(() => import("./PagesOP/OPServerOrderPlacing").then(module => ({ default: module.OPServerOrderPlacing })))
const OPServerOrderProcessing = lazy(() => import("./PagesOP/OPSeverOrderProcessing").then(module => ({ default: module.OPServerOrderProcessing })))
const OPServerOrderCompleted = lazy(() => import("./PagesOP/OPSeverOrderCompleted").then(module => ({ default: module.OPServerOrderCompleted })))
const OPChefOrderTaking = lazy(() => import("./PagesOP/OPChefOrderTaking").then(module => ({ default: module.OPChefOrderTaking })))
const OPChefOrderCompleted = lazy(() => import("./PagesOP/OPChefOrderCompleted").then(module => ({ default: module.OPChefOrderCompleted })))
const OPCasherBilling = lazy(() => import("./PagesOP/OPCasherBilling").then(module => ({ default: module.OPCasherBilling })))
const OPError404 = lazy(() => import("./PagesOP/OPError404").then(module => ({ default: module.OPError404 })))

export const OPRoutes = () => {
    const getAppStoreData = useSelector((state) => state.appstate.login_info);
    return [
        {
            path: "/",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEntry />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/Restuarant",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelEntry />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/Restuarant/Restuarant-login",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelLogin />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/Restuarant/Restuarant-signup",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelSignup />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/employee",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEmployeeEntry />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: "/employee/employee-login",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEmployeeLogin />
                </Suspense>
            ),
            isloggedin: false,
        },
        {
            path: `/${getAppStoreData.companyName}/${getAppStoreData.usertype !== "restauant" ? getAppStoreData.usertype : undefined}/my-profile`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEmployeeUser />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/${getAppStoreData.usertype !== "restauant" ? getAppStoreData.usertype : undefined}/settings`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPEmployeeSettings />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/server/order-placing`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerOrderPlacing />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/server/order-processing`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerOrderProcessing />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/server/order-Completed`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPServerOrderCompleted />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/chef/order-taking`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPChefOrderTaking />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/chef/order-completed`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPChefOrderCompleted />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/casher/order-completed`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPCasherBilling />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/my-profile`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelUser />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/addemployees`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAddEmployees />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/viewemployees`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPViewEmployees />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/addtable`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAddBench />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/viewtable`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPViewBench />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/settings`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPHotelSettings />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/addmenucard`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPAddMenuCard />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: `/${getAppStoreData.companyName}/restauant/viewmenucard`,
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPViewMenuCard />
                </Suspense>
            ),
            isloggedin: true,
        },
        {
            path: "*",
            element: (
                <Suspense fallback={<OPLoader />}>
                    <OPError404 />
                </Suspense>
            ),
            isloggedin: false,
        },
    ]
}
