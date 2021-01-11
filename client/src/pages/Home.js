import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition, Button } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

const Home = () => {
  const { user } = useContext(AuthContext);

  const { loading, data, refetch } = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (data) {
      setPosts(data?.getPosts);
      console.log('data?');
    }
    console.log('re-render');
  }, []);

  const seePost = async () => {
    const {
      data: { getPosts },
    } = await refetch();
    console.log(getPosts);
    setPosts(getPosts);
    setToggle(true);
  };

  const hidePost = () => {
    setPosts([]);
    setToggle(false);
  };

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Post</h1>
        <Button onClick={toggle ? hidePost : seePost}>
          {toggle ? 'Hide' : 'Load'}
        </Button>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
