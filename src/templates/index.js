import React from "react"
import Link from "gatsby-link"
import Helmet from 'react-helmet'
import Header from '../components/Header'
import BlogCard from '../components/BlogCard'
import PaginateLink from '../components/PaginateLink'
import Footer from '../components/Footer'
import author from '../author/harrison.json'
 
const IndexPage = ({ data, pathContext }) => {
  const { group, index, first, last } = pathContext
  const previousUrl = index - 1 == 1 ? "" : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  const total = data.allMarkdownRemark.edges.filter(post => post.node.frontmatter.templateKey === 'blog-post').length

  return (

      <div className="home-template">

        <Header image='https://lh3.googleusercontent.com/proxy/qw_gLX7fw-wVvdfPDQBXr4l1WCT2Y7C1EtB5V0lKL8GiLdDqfWbFzXivCFEYJEwkRvXVJCLbcy2bUW7y_kz0HRNepfL75Mv7KcccmRbvitO9MDerICVDNdwrJ3TDU92gS6iFfrkbqHigJDa19nZm4Hk6UNkVkEk' title="Đà Lạt Kỷ Niệm" tagline="Lần đầu tôi kể.." />
      
        <main id="site-main" className="site-main outer" role="main">

            <div className="inner">

                <div className="post-feed">

                    {group.map(({ node }) => (

                        <BlogCard key={ node.id } path={ node.frontmatter.path } image={ node.frontmatter.image }  tag={ node.frontmatter.tags[0] } title={ node.frontmatter.title } date ={ node.frontmatter.date } description={ node.frontmatter.description } authorImage={ author.cardimage } authorName={ author.name } />

                    ))}

                </div>

                <div className="paginatation">
                    <div className="previousLink">
                        <PaginateLink tag={ first } url={ previousUrl } text="Bài cũ" />
                    </div>

                    <p>{index} of { Math.ceil(total/12)}</p>

                    <div className="nextLink">
                        <PaginateLink tag={ last } url={ nextUrl } text="Bài mới" />
                    </div>

                </div>

            </div>
        </main>

        <Footer />

    </div>
    
  )
}

export default IndexPage

export const pageQuery = graphql`
query IndexQuery {
  allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
    totalCount
    edges {
      node {
        excerpt(pruneLength: 40)
        id
        frontmatter {
          title
          templateKey
          date(formatString: "MMMM DD, YYYY")
          path
        }
      }
    }
  }
}
`;