import React, { Component } from 'react';

function Main({ children }) {
	return (
		<main className="main-content">
			{ children }
		</main>
	);
}

export default Main;