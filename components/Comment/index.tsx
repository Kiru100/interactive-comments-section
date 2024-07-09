import { CommentInterface } from '@/constants/interfaces';
import { StyleSheet, View } from 'react-native';
import { Message } from '../Message';

import commentStore from '@/stores/comments';
import React from 'react';
import { CurrentUser } from '@/stores/user';

export const Comment = ({data} : {data: CommentInterface}) => {
	const upComment = commentStore((store) => store.upComment);
	const downComment = commentStore((store) => store.downComment);
	const deleteComment = commentStore((store) => store.deleteComment);
	const updateComment = commentStore((store) => store.updateComment);

	const upReply = commentStore((store) => store.upReply);
	const downReply = commentStore((store) => store.downReply);
	const updateReply = commentStore((store) => store.updateReply);
	const deleteReply = commentStore((store) => store.deleteReply);

	const addReply = commentStore((store) => store.addReply);

    return (
		<>
			<Message 
				data={data}
				onPressUpMessage={(message_id: string, current_user_id: string)=>upComment(message_id, current_user_id)}
				onPressUpdateButton={(message_id: string, new_comment: string)=>updateComment(message_id, new_comment)}
				onPressDownMessage={(message_id: string, current_user_id: string)=>downComment(message_id, current_user_id)}
				onPressDeleteMessage={(message_id: string)=>deleteComment(message_id)}
				onReply={(message_id: string, reply_value: string, current_user: CurrentUser)=>addReply(message_id, reply_value, current_user )}
			/>	
			{ 
				data?.replies?.length ? 
				(
					<View style={styles.reply_container}>
						<View style={styles.vertical_reply_line}></View>
						<View style={styles.reply_list}>
							{
								data?.replies?.map((reply)=>
									(
										
										<Message 
											data={reply}
											key={`reply_${reply.id}`}
											onPressUpMessage={(message_id: string, current_user_id: string)=>upReply(data.id, message_id, current_user_id)}
											onPressDownMessage={(message_id: string, current_user_id: string)=>downReply(data.id, message_id, current_user_id)}
											onPressUpdateButton={(message_id: string, new_message: string)=>updateReply(data.id, message_id, new_message)}
											onPressDeleteMessage={(message_id: string)=>deleteReply(data.id, message_id)}
											onReply={(message_id: string, reply_value: string, current_user: CurrentUser)=>addReply(message_id, reply_value, current_user )}
										/>							
									)
								)
							}
						</View>
				</View>	
				) : ""
				
			}
		</>
    )
}

const styles = StyleSheet.create({
	flex:{
		display: "flex"
	},
	hidden:{
		display: "none"
	},
	reply_list:{
		flexDirection: "column",
		gap: 16,
		flex: 1
	},
	comment_date:{
		color: "#67727E", 
		fontSize: 16,
		lineHeight: 24,
		fontFamily:"Rubik_400Regular",
		flex: 1
	},
	user_name:{
		color: "#334253",
		fontSize: 16,
		fontFamily:"Rubik_500Medium",
		overflow: "hidden",
	},
	image: {
		borderRadius: 50,
		height: 32,
		width: 32,
		backgroundColor: '#0553',
	},
	self_indication:{
		backgroundColor :"#5357B6",
		fontSize: 13,
		color: "#fff",
		paddingHorizontal: 6,
		paddingTop: 1,
		paddingBottom: 3,
		fontFamily:"Rubik_500Medium",
		borderRadius: 2
	},
	comment:{
		width: '100%',
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8
	},
	comment_details:{
		width: '100%',
		gap: 16,
		flexDirection:"row",
		alignItems:"center",
		overflow: "hidden"
	},
	comment_content:{
		marginTop: 16,
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	comment_actions:{
		flexDirection:"row",
		alignContent: "center",
		overflow: "hidden",
		marginTop: 16,
		justifyContent: "space-between"
	},
	up_down_vote_container: {
		flexDirection:"row",
		paddingHorizontal: 12,
		paddingVertical: 10,
		backgroundColor: "#F5F6FA",
		borderRadius: 10,
		alignItems: "center",
        gap: 8
	},
	up_down_vote_count:{
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
		width: 30,
		textAlign: "center",
		color: "#5357B6",
	},
	up_vote_icon: {
		height: 10,
		width: 10,
	},
	down_vote_icon: {
		height: 2.5,
		width: 10,
	},
	reply_button:{
		flexDirection:"row",
		alignItems: "center",
	},
	reply_icon:{
		height: 12.25,
		width: 14,
	},
	reply_label:{
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
		color:"#5357B6",
		marginLeft: 8
	},
	crud_action:{
		flexDirection: "row",
		gap: 16
	},
	delete_label:{
		color: "#ED6368"
	},
	edit_icon:{
		width: 14,
		height: 13.95
	},
	delete_icon: {
		width: 11.67,
		height: 14
	},

	modal_content:{
		backgroundColor: "#fff",
		borderRadius: 8,
		paddingHorizontal: 27,
		paddingVertical: 24
	},
	modal_message: {
		color: "#67727E",
		fontFamily:"Rubik_400Regular",
		fontSize: 16,
		lineHeight: 24,
		marginTop: 16
	},
	modal_title:{
		fontFamily: "Rubik_500Medium",
		fontSize: 20,
		color: "#334253"
	},
	modal_cancel_button:{
		flex:1,
		alignItems: "center",
		backgroundColor: "#67727E",
		borderRadius: 8,
		paddingVertical: 12
	},
	modal_accept_button:{
		flex:1,
		alignItems: "center",
		backgroundColor: "#ED6368",
		borderRadius: 8,
		paddingVertical: 12
	},
	modal_actions_container:{
		flexDirection: "row",
		gap: 12,
		marginTop: 16
	},
	modal_button_label:{
		color: "#fff",
		fontFamily: "Rubik_500Medium",
		fontSize: 16,
	},


	editing_container:{
		marginTop: 16
	},
	text_input_container:{
		borderColor: "#E9EBF0",
		borderWidth: 1,
		borderRadius: 8,
		padding: 12
	},
	edit_text_input:{
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	cancel_edit_button:{
		fontSize: 16,
		lineHeight: 24,
		color: "#67727E",
		fontFamily:"Rubik_400Regular"
	},
	editing_comment_actions:{
		flexDirection: "row",
		marginTop: 16,
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 8,
	},
	vertical_reply_line:{
		width: 2,
		backgroundColor: "#E9EBF0",
		height: "100%"
	},
	reply_container:{
		flexDirection: "row",
		gap: 16,
		marginTop: 16,
	}
	
});
