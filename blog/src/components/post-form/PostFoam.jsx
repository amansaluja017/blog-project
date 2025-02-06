import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import service, { Service } from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostFoam({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            featuredImage: post?.featuredImage || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async (data) => {
        if (post) {
            data.image[0] ? Service.uploadFile(data.image[0]) : null
            if (file) {
                Service.deleteFile(post.featuredImage)
            }
            const dbPost = await Service.updatePost(post.$id, {
                ...data, featuredImage: file ? file.$id : undefined,
            })
            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await Service.uploadFile(data.image[0]);

            if(!file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await Service.createPost({
                    ...data,
                    userId: userData.$id,
                })
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
    
    return (
        <div>PostFoam</div>
    )
}

export default PostFoam