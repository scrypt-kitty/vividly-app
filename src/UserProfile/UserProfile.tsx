import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LikedIcon from './assets/Liked.svg';
import UnlikedIcon from './assets/Unliked.svg';
import CommentsIcon from './assets/Comments.svg';

import ScreenLoadingIndicator from './ScreenLoadingIndicator';
import AppContext from '../AppContext';
import { User, UserProfileProps, Post } from '../interfaces';
import {
	HeaderColor,
	ProfilePicture,
	ProfilePictureContainer,
	ScreenContainer,
	UserInfoContainer,
	Name,
	Username,
	NamesContainer,
	PostContainer,
	PostInteractionContainer,
	UnreadBannerContainer,
	UnreadBannerText,
	PostWrapper,
} from './styles';

const createProfilePost = ({ item, index, onPressPost }: { item: Post; index: number, onPressPost: any }) => {
	return (
		<PostWrapper>
			<Pressable onPressOut={() => onPressPost(item)}>
				<PostContainer key={item.id}>
					{item.content.map((c) => (
						<Text key={item.id}>{`${index}: ${c.content}`}</Text>
					))}
				</PostContainer>
			</Pressable>
			<PostInteractionContainer>
				{item.isLikedByCurUser ? (
					<LikedIcon height='100%' />
				) : (
					<UnlikedIcon height='100%' />
				)}
				<CommentsIcon height='100%' />
				<Text>{item.likeCount}</Text>
				<Text>{`  —  ${item.createdTime}`}</Text>
			</PostInteractionContainer>
		</PostWrapper>
	);
};

interface UnreadBannerProps {
	user: User;
	onPress: () => void;
}

const UnreadBanner = ({ user, onPress }: UnreadBannerProps) => (
	<Pressable onPressIn={onPress}>
		<UnreadBannerContainer>
			<UnreadBannerText>{`${user.unreadPosts} unread post${
				user.unreadPosts > 1 ? 's' : ''
			}`}</UnreadBannerText>
		</UnreadBannerContainer>
	</Pressable>
);

const UserProfile = ({ navigation, route }: UserProfileProps) => {
	const { findNextUser, markFeedRead } = useContext(AppContext);

	const [user, setUser] = useState(route.params.user);
	const [index, setIndex] = useState(route.params.index);
	const [isUnreadBannerShowing, setIsUnreadBannerShowing] = useState<boolean>(
		false,
	);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const [isScreenLoading, setIsScreenLoading] = useState<boolean>(false);
	const postListRef = useRef(null);

	useEffect(() => {
		if (user.unreadPosts > 0) {
			setIsUnreadBannerShowing(true);
		} else {
			setIsUnreadBannerShowing(false);
		}
	}, [user]);

	useEffect(() => {
		setUser(route.params.user);
		setIndex(route.params.index);
	}, [route.params.user, route.params.index]);

	const [posts, setPosts] = useState<Post[]>([
		{
			id: 1,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: false,
		},
		{
			id: 2,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 7,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 9,
			isLikedByCurUser: false,
		},
		{
			id: 3,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},

		{
			id: 4,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},

		{
			id: 5,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 6,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 7,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 8,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 9,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 10,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 11,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 12,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 13,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 14,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
		{
			id: 15,
			content: [
				{
					type: 'text',
					content: 'Hello world',
				},
			],
			updatedTime: 6,
			likeCount: 5,
			commentCount: 0,
			isUnread: true,
			createdTime: 8,
			isLikedByCurUser: true,
		},
	]);

	const onRefresh = () => {
		setIsScreenLoading(true);
		const nextUser = findNextUser(index);
		// markFeedRead(route.params.index);
		if (nextUser) {
			setUser(nextUser);
			setIndex(index + 1);
		} else {
			console.log('cant find');
		}

		setTimeout(() => setIsScreenLoading(false), 500);
	};

	const onPressUnreadBanner = () => {
		if (postListRef) {
			postListRef!.current!.scrollToIndex({
				index: user.unreadPosts,
				viewPosition: 1,
			});
		}
	};

	const onPressPost = ({ post }: { post: Post}) => {
		navigation.navigate("PostPage", {
			user, post
		});
	}

	return (
		<>
			{isScreenLoading ? <ScreenLoadingIndicator /> : null}
			<SafeAreaView>
				<HeaderColor />
				<ScreenContainer>
					<UserInfoContainer>
						<ProfilePictureContainer>
							<ProfilePicture
								source={require('../Home/pup.jpeg')}
							/>
						</ProfilePictureContainer>
						<NamesContainer>
							<Name>{user.name}</Name>
							<Username>@{user.username}</Username>
						</NamesContainer>
						<Text>{user.bio}</Text>
					</UserInfoContainer>

					{isUnreadBannerShowing ? (
						<UnreadBanner
							user={user}
							onPress={onPressUnreadBanner}
						/>
					) : null}

					<FlatList<Post>
						ref={postListRef}
						inverted={true}
						refreshing={isRefreshing}
						data={posts}
						renderItem={({ item, index }: { item: Post; index: number }) => createProfilePost({item, index, onPressPost})}
						keyExtractor={(post: Post) => post.id.toString()}
						onRefresh={onRefresh}
					/>
				</ScreenContainer>
			</SafeAreaView>
		</>
	);
};

export default UserProfile;
