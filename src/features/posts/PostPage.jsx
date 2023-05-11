import React, { useEffect } from 'react'
import Layout from 'components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './postSlice'
// import PostLoadingComponent from './PostLoading'
import PostLoading from './PostLoading'
import Posts from './Posts'

const PostPage = () => {
  // const PostLoading = PostLoadingComponent(Posts)
  const dispatch = useDispatch()

  const { posts, loading } = useSelector(state => state.posts)

  useEffect(
    () => {
      dispatch(getPosts())
    },
    [dispatch]
  )

  return (
    <Layout>
      <div>
        <h1>Latest Posts</h1>
        <PostLoading posts={posts} isLoading={loading} />
      </div>
    </Layout>
  )
}

export default PostPage
