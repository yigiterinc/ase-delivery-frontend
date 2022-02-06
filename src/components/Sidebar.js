import React from "react";

import {Link, NavLink} from "react-router-dom";

import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";


const Sidebar = () => {
    return (
    <div
        style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
        <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <Link
                    to="/dashboard"
                    className="text-decoration-none"
                    style={{ color: "inherit" }}
                >
                    {" "}
                    Menu{" "}
                </Link>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu>
                    <NavLink
                        exact
                        to="/users"
                    >
                        <CDBSidebarMenuItem icon="user">
                            Users
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink
                        exact
                        to="/deliveries"
                    >
                        <CDBSidebarMenuItem icon="people-carry">
                            Deliveries
                        </CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink
                        exact
                        to="/boxes"
                    >
                        <CDBSidebarMenuItem icon="box-open">Boxes</CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: "center" }}>
                <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
            </CDBSidebarFooter>
        </CDBSidebar>
    </div>)
}

export default Sidebar;