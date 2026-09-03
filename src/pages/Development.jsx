import React from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import DevelopmentHub from "../components/development/DevelopmentHub";

export const Development = () => {
    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <Breadcrumbs />
            <DevelopmentHub />
        </div>
    );
};

export default Development;
