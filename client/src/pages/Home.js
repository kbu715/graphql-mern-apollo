import React from "react";
import { useQuery, gql } from "@apollo/client";
// import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const Home = () => {
  const {
    loading,
    data,
  } = useQuery(FETCH_POSTS_QUERY);
  if (data) {
    console.log(data);
  }
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Post</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          data?.getPosts?.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
