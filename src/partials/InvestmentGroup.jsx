import React from "react";

function InvestmentGroup( {title, hasSearch, content}) {
    return (
    <div className="text-center relative pt-32 pb-12 md:pt-40 md:pb-20">
        <h1>{title}</h1>

        {hasSearch && (
            <p>Hola que tal, soy una busqueda</p>
            // <SearchBar />
        )}
    </div>
    )
}

export default InvestmentGroup;
