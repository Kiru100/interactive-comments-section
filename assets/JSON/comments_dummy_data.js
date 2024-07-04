// Sample data
export const comments = [
	{
	  "comment_id": "3",
	  "content": "One thing that helped me a lot was following a structured learning path. There are so many resources out there, but finding a good course can make all the difference.",
	  "upvotes": ["user2", "user3", "user4", "user6", "user7", "user8", "user9", "user10", "user11", "user12", "user13", "user14", "user15", "user16"],
	  "downvotes": ["user17", "user18", "user19", "user5"],
	  "date": "2024-06-25T09:00:00Z",
	  "user_profile": {
		"user_id": "user5",
		"username": "charlie_brown",
		"avatar_url": "https://i.pravatar.cc/150?img=7"
	  },
	  "replies": []
	},
	{
	  "comment_id": "6",
	  "content": "Can anyone recommend a good course or tutorial for React? I feel like I’m getting lost in all the different resources available.",
	  "upvotes": ["user1", "user3", "user5", "user7", "user9", "user11", "user13", "user15", "user17", "user19", "user21", "user23"],
	  "downvotes": ["user2", "user4", "user6", "user8"],
	  "date": "2024-06-30T14:00:00Z",
	  "user_profile": {
		"user_id": "user9",
		"username": "george_harris",
		"avatar_url": "https://i.pravatar.cc/150?img=11"
	  },
	  "replies": []
	},
	{
	  "comment_id": "9",
	  "content": "For me, building small projects was the key to learning. It’s one thing to read about concepts, but another to actually implement them.",
	  "upvotes": ["user2", "user4", "user6", "user8", "user10", "user12", "user14", "user16", "user18", "user20", "user22"],
	  "downvotes": ["user1", "user3", "user5", "user7"],
	  "date": "2024-06-27T11:00:00Z",
	  "user_profile": {
		"user_id": "user12",
		"username": "julia_wilson",
		"avatar_url": "https://i.pravatar.cc/150?img=14"
	  },
	  "replies": []
	},
	{
	  "comment_id": "1",
	  "content": "If you’re still new, I’d recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It’s very tempting to jump ahead but lay a solid foundation first.",
	  "upvotes": ["user3", "user5", "user7", "user9", "user11", "user13", "user15", "user17", "user19", "user21"],
	  "downvotes": ["user2", "user4", "user6", "user8", "user10", "user12"],
	  "date": "2024-06-27T10:00:00Z",
	  "user_profile": {
		"user_id": "user1",
		"username": "john_doe",
		"avatar_url": "https://i.pravatar.cc/150?img=3"
	  },
	  "replies": [
		{
		  "reply_id": "1-1",
		  "content": "I totally agree with you, John. Understanding the basics can make learning React much easier and more enjoyable.",
		  "upvotes": ["user2", "user4", "user6", "user8", "user10"],
		  "downvotes": ["user3", "user5"],
		  "date": "2024-06-28T11:00:00Z",
		  "user_profile": {
			"user_id": "user2",
			"username": "jane_smith",
			"avatar_url": "https://i.pravatar.cc/150?img=4"
		  }
		},
		{
		  "reply_id": "1-2",
		  "content": "That’s true, but I think it's also important to start building projects as soon as possible. Hands-on experience is invaluable.",
		  "upvotes": ["user5", "user7"],
		  "downvotes": ["user8", "user10", "user12"],
		  "date": "2024-06-29T12:00:00Z",
		  "user_profile": {
			"user_id": "user3",
			"username": "alice_wong",
			"avatar_url": "https://i.pravatar.cc/150?img=5"
		  }
		}
	  ]
	},
	{
	  "comment_id": "10",
	  "content": "Absolutely, Julia. I’ve learned so much from just getting my hands dirty and coding. Plus, it’s a lot of fun!",
	  "upvotes": ["user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9"],
	  "downvotes": ["user1", "user10", "user11"],
	  "date": "2024-06-26T10:00:00Z",
	  "user_profile": {
		"user_id": "user13",
		"username": "karen_davis",
		"avatar_url": "https://i.pravatar.cc/150?img=15"
	  },
	  "replies": []
	},
	{
	  "comment_id": "7",
	  "content": "I highly recommend the official React documentation. It's thorough and up-to-date with the latest changes and best practices.",
	  "upvotes": ["user1", "user3", "user5", "user7", "user9", "user11", "user13", "user15", "user17"],
	  "downvotes": ["user2", "user4", "user6", "user8", "user10"],
	  "date": "2024-06-29T13:00:00Z",
	  "user_profile": {
		"user_id": "user10",
		"username": "helen_clark",
		"avatar_url": "https://i.pravatar.cc/150?img=12"
	  },
	  "replies": []
	},
	{
	  "comment_id": "5",
	  "content": "I’ve been learning from both free and paid resources. Sometimes, paying for a good course can save you a lot of time and frustration.",
	  "upvotes": ["user2", "user3", "user4", "user5", "user6", "user7"],
	  "downvotes": ["user1", "user8", "user9"],
	  "date": "2024-07-01T15:00:00Z",
	  "user_profile": {
		"user_id": "user8",
		"username": "frank_thomas",
		"avatar_url": "https://i.pravatar.cc/150?img=10"
	  },
	  "replies": []
	},
	{
	  "comment_id": "2",
	  "content": "I’ve been using React for a few months now, and I still find myself going back to review the fundamentals. It's a continuous learning process.",
	  "upvotes": ["user1", "user3", "user5"],
	  "downvotes": ["user2", "user4", "user6"],
	  "date": "2024-07-01T13:00:00Z",
	  "user_profile": {
		"user_id": "user4",
		"username": "bob_johnson",
		"avatar_url": "https://i.pravatar.cc/150?img=6"
	  },
	  "replies": [
		{
		  "reply_id": "2-1",
		  "content": "Absolutely, Bob. Even seasoned developers revisit the basics. It's all about reinforcing what you’ve learned.",
		  "upvotes": ["user2"],
		  "downvotes": ["user3"],
		  "date": "2024-07-02T14:00:00Z",
		  "user_profile": {
			"user_id": "user1",
			"username": "john_doe",
			"avatar_url": "https://i.pravatar.cc/150?img=3"
		  }
		}
	  ]
	},
	{
	  "comment_id": "8",
	  "content": "The React documentation is good, but it can be a bit overwhelming for beginners. I'd suggest starting with a video tutorial or a beginner-friendly course.",
	  "upvotes": ["user1", "user3", "user5", "user7"],
	  "downvotes": ["user2", "user4", "user6"],
	  "date": "2024-06-28T12:00:00Z",
	  "user_profile": {
		"user_id": "user11",
		"username": "ian_lee",
		"avatar_url": "https://i.pravatar.cc/150?img=13"
	  },
	  "replies": []
	},
	{
	  "comment_id": "4",
	  "content": "I started with free resources like MDN and FreeCodeCamp. They were really helpful, especially when I was just getting started.",
	  "upvotes": ["user1", "user2", "user3", "user4"],
	  "downvotes": ["user8", "user9", "user10", "user5", "user6", "user7"],
	  "date": "2024-06-26T08:00:00Z",
	  "user_profile": {
		"user_id": "user6",
		"username": "david_miller",
		"avatar_url": "https://i.pravatar.cc/150?img=8"
	  },
	  "replies": [
		{
		  "reply_id": "4-1",
		  "content": "FreeCodeCamp is amazing! Their curriculum is very well-structured and easy to follow.",
		  "upvotes": ["user1", "user2", "user3"],
		  "downvotes": ["user4"],
		  "date": "2024-06-27T09:30:00Z",
		  "user_profile": {
			"user_id": "user7",
			"username": "eva_martinez",
			"avatar_url": "https://i.pravatar.cc/150?img=9"
		  }
		}
	  ]
	}
  ];
  