import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPosts,
  createPost,
  deletePost as deletePostAction,
  updatePost as updatePostAction,
} from '../../../context/PostContext'
import CustomConfirmDeleteModal from '../../../components/CustomConfirmDeleteModal'
import CustomEditModal from '../../../components/CustomEditModal'
import { useUser } from '../../../context/UserContext'
import editIcon from '../../../../public/edit.svg'
import deleteIcon from '../../../../public/delete.svg'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { formatDistanceToNow } from 'date-fns'

const Create = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [selectedPost, setSelectedPost] = useState(null)

  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.items)
  const postStatus = useSelector((state) => state.posts.status)
  const { username } = useUser()
  const postError = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  useEffect(() => {
    if (postError) {
      console.error('Erro ao buscar posts:', postError)
    }
  }, [postError])

  const handleCreatePost = (e) => {
    e.preventDefault()
    const newPost = {
      username: username,
      title,
      content,
    }
    dispatch(createPost(newPost))
    setTitle('')
    setContent('')
  }

  const handleDelete = (postId) => {
    setSelectedPostId(postId)
    setShowDeleteModal(true)
  }

  const handleEdit = (postId) => {
    const post = posts.find((post) => post.id === postId)
    setSelectedPost(post)
    setSelectedPostId(postId)
    setShowEditModal(true)
  }

  const confirmDelete = async () => {
    try {
      dispatch(deletePostAction(selectedPostId))
      setShowDeleteModal(false)
      setSelectedPostId(null)
    } catch (error) {
      console.error('Erro ao excluir função:', error)
    }
  }

  const handleUpdatePost = async (updatedPost) => {
    try {
      await dispatch(updatePostAction({ id: selectedPostId, updatedPost }))
      setShowEditModal(false)
      setSelectedPost(null)
      setSelectedPostId(null)
    } catch (error) {
      console.error('Erro ao atualizar post:', error)
    }
  }

  return (
    <>
      <CRow className="d-grid gap-2 col-11 mx-auto">
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader style={{ backgroundColor: '#7695ec' }}>
              <h2 style={{ color: '#fff' }}>CodeLeap Network</h2>
            </CCardHeader>
            <CCardBody>
              <CRow className="d-grid gap-2 col-11 mx-auto">
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardBody>
                      <h2>What’s on your mind?</h2>
                      <CForm className="row g-3" onSubmit={handleCreatePost}>
                        <CCol md={12}>
                          <CFormLabel htmlFor="title">Title</CFormLabel>
                          <CFormInput
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </CCol>
                        <CCol md={12}>
                          <CFormLabel htmlFor="content">Content</CFormLabel>
                          <CFormTextarea
                            id="content"
                            rows={5}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                          />
                        </CCol>
                        <CCol xs={12} className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <CButton
                            color="primary"
                            type="submit"
                            style={{ backgroundColor: '#7695ec', borderColor: '#7695ec' }}
                          >
                            Create
                          </CButton>
                        </CCol>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>

              {posts.map((post) => (
                <CRow key={post.id} className="d-grid gap-2 col-11 mx-auto">
                  <CCol xs={12}>
                    <CCard className="mb-4">
                      <CCardHeader
                        style={{
                          backgroundColor: '#7695ec',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <h2 style={{ color: '#fff' }}>{post.title}</h2>
                        <div>
                          <img
                            src={deleteIcon}
                            alt="Delete"
                            style={{ width: '20px', marginRight: '10px', cursor: 'pointer' }}
                            onClick={() => handleDelete(post.id)}
                          />
                          <img
                            src={editIcon}
                            alt="Edit"
                            style={{ width: '30px', cursor: 'pointer' }}
                            onClick={() => handleEdit(post.id)}
                          />
                        </div>
                      </CCardHeader>
                      <CCardBody>
                        <CRow>
                          <CCol xs={6}>
                            <p>@{post.username}</p>
                          </CCol>
                          <CCol xs={6} className="text-end">
                            <p>{formatDistanceToNow(new Date(post.created_datetime))}</p>
                          </CCol>
                        </CRow>
                        <p>{post.content}</p>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CustomConfirmDeleteModal
        visible={showDeleteModal}
        title="Delete"
        body="Are you sure you want to delete this item?"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
      <CustomEditModal
        visible={showEditModal}
        title="Edit Post"
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdatePost}
        post={selectedPost}
      />
    </>
  )
}

export default Create
