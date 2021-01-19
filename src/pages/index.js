import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from "../components/button"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Things I forget"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <h1>
          Hi{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>
          If you've arrived here somehow then welcome to a list/blog/snippet
          type affair.
        </p>
        <p>
          It is simultaneously a chance to check out Gatsby and Netlify
          CMS/Deployment and to post things I always end up googling because I
          forget them, or things I consistently implement in projects that I can
          copy in to new ones as and when I need them.
        </p>
        <p>
          It'll probably include links to things I've found useful too. Who
          knows. If any of my attempts to do things of this type are anything to
          go by I'll add a few examples then forget about it and carry on
          googling.
        </p>
        <Link to="/blog/">
          <Button marginTop="35px">Go to whatever this is...</Button>
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
