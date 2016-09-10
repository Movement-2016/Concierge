import React from 'react';

export default class AboutPage extends React.Component {
  render () {
    return (
      <div className='about-area' ref={ref => { this._div = ref; }}>
        <h2>About Movement 2016</h2>
        <p>
          Movement 2016 is a service to donors – from grassroots to major
          donors and foundations.  We provide non-partisan research on local
          vote efforts, eventually in all 50 states, that BOTH turn out voters
          in the short term AND are building toward a larger interconnected
          “movement of movements” (in the words of Naomi Klein) over the long
          term.
        </p>
        <p>
          Specifically, we talent scout and vet the most effective efforts in
          each state where an extra $10 or $100,000 will make the greatest
          difference for achieving progress on issues like economic fairness,
          environmental sustainability, racial justice, immigrant rights,
          women’s rights, LGBT rights, and democracy – in 2016 AND beyond.
        </p>
        <p>
          <strong>How and why it works:</strong>
        </p>
        <p>
          To give some texture on what these groups actually do and why they
          are an effective use of resources, here are some of our core criteria
          and the characteristics we look for in these organizations:
        </p>
        <ol>
          <li><strong>Trusted messengers </strong>who organize year-round on
            local and national issues that have deep salience to their local
            constituencies (ie. Racial and criminal justice, immigrant rights,
            college affordability, climate, living wages, etc).
          </li>
          <li><strong>Proven competence in and commitment to voter engagement </strong>
            (voter registration, voter education, voter
            turnout, and election protection).
          </li>
          <li><strong>Roots in communities</strong> (Low-income communities,
            immigrants, youth and students, renters, etc).
          </li>
          <li><strong>Experience in deploying proven high-touch face-to-face
          voter organizing techniques at scale.</strong>
          </li>
        </ol>
        <p>
          To this end, we recommend two different types of groups that share
          these qualities:
        </p>
        <p>
          We recommend 501(c)(3) <strong>Non-Partisan</strong> groups that
          organize:
        </p>
        <ul>
          <li><b>Communities of Color</b>: The best local organizations that get
            out the vote in communities of color and organize permanently beyond
            election cycles to create <strong>
              <a
                href='http://wholeads.us/'
                target='_blank'
                rel='noopener noreferrer'
              >
                a more Reflective Democracy
              </a>
            </strong> representing the true diversity of the
            American people.
          </li>
          <li><strong>Working class, rural, low-income, disabled, elderly or
          young voters, students, renters, veterans, new Americans or
          returning citizens, Americans for whom English is a second language,
          and others</strong> who may have additional barriers or may need
          additional support to participate and have their voices heard in
          the civic process.
          </li>
        </ul>
        <p>
          AND, separately, we recommend explicitly <strong>progressive
          non-partisan</strong> 501(c)4, 527, PAC, State PAC or Super PAC
          groups that are:
        </p>
        <ul>
          <li><b>Organizing Year-Round</b>: 365 days a year to develop leaders,
            fight for marginalized communities, move policy, and win
            independent progressive political power on all levels &#8211;
            challenging Democrats, Republicans, and third party candidates
            alike, based on issues and progressive values.
          </li>
          <li><b>Collaborative</b>: Play well in the sandbox with others.</li>
          <li><b>Locally-Driven</b>: Generally not affiliates of large national
            issue organizations that are already household names (e.g. Sierra
            Club, Planned Parenthood, etc.) These groups are also awesome.
            But people already know how to give to them so they don’t need
            our help with exposure in the same way.
          </li>
        </ul>
        <p>
          <em>*Movement 2016 is a work in progress. We are adding and editing
          states and groups by the week. If you would like to nominate a
          new group or have feedback on a group that is already listed,
          please email billywimsatt@gmail.com.</em>
        </p>
        <h5>Who is behind this?</h5>
        <p>
          Movement 2016 is maintained by a philanthropic advising service
          called <strong>Gamechanger Advising</strong>, powered by a growing
          team with a lot of help and expertise from a lot of amazing partners.
          In researching this, we sought advice from more than 20 key national
          organizing networks, funders and political donors. But we take full
          responsibility for the contents. We started Movement 2016 because
          every election cycle people ask us questions like: <em>“What
          groups should I give to in order to have the biggest
          impact?”</em> or “<em>How do I fund groups in the South led by
          people of color?</em>” Movement 2016 is a way to formalize this
          resource and make it accessible to a wider public. This is still
          a work in progress – but as far as we know, it is the best (and
          only) resource of its kind.
        </p>
        <p>
          If you would like more information or have questions please don’t
          hesitate to call at 646-346-0248 or email advisor@movement2016.org.
          We know this list can be overwhelming, so we’re happy to talk it
          through, based on <em>your</em> preferences and goals.
        </p>
        <p>
          Finally, a friendly note of encouragement: We recommend that you
          take the time to figure out your overall budget for 2016 giving
          <em>proactively. Don’t wait until October. Don’t wait until someone
          calls to solicit you</em>. Instead of waiting, take a moment to
          write out a plan for yourself. How do you want to allocate your
          contributions strategically? What mix of national groups, local
          groups, candidates, etc. – rather than simply responding
          reactively to individual solicitations. The groups that have
          the resources to solicit you are often not the ones where your
          dollar will make the greatest impact. Being proactive will help
          you feel better about the process, instead of overwhelmed with
          urgent solicitations. We are here to help – don’t hesitate to
          use us!
        </p>
        <hr />
        <div className='about-partner-header'>NATIONAL PARTNERS</div>
        <div className='logos'>
          <div className='logo wfLogo'>
            <a href='http://workingfamilies.org' target='_blank' rel='noopener noreferrer'>
              <img src='/images/partner-logos/working-families-logo.png' alt='' />
            </a>
          </div>
          <div className='logo busLogo'>
            <a href='http://busfederation.com' target='_blank' rel='noopener noreferrer'>
              <img src='/images/partner-logos/bus-federation-logo.png' alt='' />
            </a>
          </div>
          <div className='logo paLogo'>
            <a href='http://peoplesaction.org' target='_blank' rel='noopener noreferrer'>
              <img src='/images/partner-logos/peoples-action-logo.png' alt='' />
            </a>
          </div>
          <div className='logo spLogo'>
            <a><img src='/images/partner-logos/student-power-logo.png' alt='' /></a>
          </div>
          <div className='logo lacLogo'>
            <a><img src='/images/partner-logos/lacafe.png' alt='' /></a>
          </div>
          <div className='logo ppacLogo'>
            <a href='http://powerpac.org'>
              <img src='/images/partner-logos/powerpac@0,5x.png' alt='' />
            </a>
          </div>
          <div className='logo cpdLogo'>
            <a href='http://cpdaction.org' target='_blank' rel='noopener noreferrer'>
              <img src='/images/partner-logos/cpd-logo.png' alt='' />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
