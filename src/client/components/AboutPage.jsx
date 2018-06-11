import React from 'react';
import { connect } from 'react-redux';

import scrollToElement from '../lib/scrollToElement';
import idFormat from '../lib/helperFunctions';

/* eslint-disable react/no-danger */

const PageMenuItem = ({ title }) => (
	<a onClick={() => scrollToElement('#' + idFormat(title))}>{title}</a>
);

const PageSection = ({ title, content, image }) => (
	<section id={idFormat(title)} className="page-section">
		<div className="container small-container">
			<h2 className="section-title">{title}</h2>
			<div
				className="section-body"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
		<div
			className="image-banner"
			style={{ backgroundImage: `url(${image})` }}
		/>
	</section>
);

const _AboutPage = ({ title, headerImage, pageSections }) => (
	<main className="about-page">
		<section
			className="page-header"
			style={{ backgroundImage: `url(${headerImage})` }}
  >
			<h1 className="page-title">{title}</h1>
			<nav className="page-menu">
				{pageSections.map((d, i) => <PageMenuItem key={i} title={d.title} />)}
			</nav>
		</section>
		{pageSections.map((d, i) => <PageSection key={i} {...d} />)}
	</main>
);

const mapStateToProps = ({
	router: {
		target: {
			model: {
				page: { title, aboutPageSections: pageSections, image: headerImage },
			},
		},
	},
}) => ({ title, headerImage, pageSections });

const AboutPage = connect(mapStateToProps)(_AboutPage);

module.exports = AboutPage;
