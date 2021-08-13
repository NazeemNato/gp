import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../graphql/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Authentication = {
  __typename?: 'Authentication';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id?: Maybe<Scalars['Int']>;
  user?: Maybe<User>;
  body: Scalars['String'];
};

export type CreateUserInput = {
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Authentication;
  loginUser: Authentication;
  createPost: Response;
  createComment: Response;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginUserArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  body: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['Int']>;
  author?: Maybe<User>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  comment?: Maybe<Array<Comment>>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
  post?: Maybe<Array<Post>>;
};

export type Response = {
  __typename?: 'Response';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  fullName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  post?: Maybe<Array<Post>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Authentication: ResolverTypeWrapper<Authentication>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Comment: ResolverTypeWrapper<Comment>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  CreateUserInput: CreateUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Authentication: Authentication;
  String: Scalars['String'];
  Comment: Comment;
  Int: Scalars['Int'];
  CreateUserInput: CreateUserInput;
  Mutation: {};
  Post: Post;
  Query: {};
  Response: Response;
  User: User;
  Boolean: Scalars['Boolean'];
}>;

export type AuthenticationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Authentication'] = ResolversParentTypes['Authentication']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['Authentication'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  loginUser?: Resolver<ResolversTypes['Authentication'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'username' | 'password'>>;
  createPost?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'title' | 'body'>>;
  createComment?: Resolver<ResolversTypes['Response'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'body'>>;
}>;

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<Array<ResolversTypes['Comment']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  post?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
}>;

export type ResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Authentication?: AuthenticationResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

