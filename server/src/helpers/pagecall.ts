/**
 * PCA Library
 */
import axios, { AxiosInstance } from 'axios';
import env from '../env';

type RoomType = 'open' | 'public' | 'private';

type User = {
  id: string;
  user_id: string;
  access_token: string;
  name: string;
  metadata: Record<string, unknown>;
  organization_id: string;
  application_id: string;
  created_at: string;
  updated_at: string;
};

type Session = {
  _id: string;
  connection_id: string;
  connected_at: string;
  disconnected_at?: string;
  subscribed_media_size: number;
  subscribed_canvas_time: number;
  elapsed_time: number;
  room_id: string;
  user_id: string;
  member_id: string;
  application_id: string;
  organization_id: string;
  __v: number;
  start_using_canvas_at: string;
};

type Member = {
  id: string;
  user_id: string;
  name: string;
  metadata: Record<string, unknown>;
  organization_id: string;
  application_id: string;
  access_token: string;
  is_anonymous: boolean;
  room_id: string;
  sessions: Session[];
  created_at: string;
  updated_at: string;
};

type Room = {
  id: string;
  type: RoomType;
  name: string;
  layout_id: string;
  is_distinct: boolean;
  organization_id: string;
  application_id: string;
  initial_pages: string[];
  distinct_user_ids: string[];
  is_terminated: boolean;
  terminated_at: string;
  created_at: string;
  updated_at: string;
  layout?: Record<string, unknown>;
  members?: Member[];
};

export class PageCall {
  private key: string;

  private endpoint: string;

  private instance: AxiosInstance;

  /**
   * 생성자
   * @param key PageCall API Key
   * @param endpoint PageCall API Endpoint
   */
  constructor(key: string, endpoint = 'https://api.pagecall.net/v1') {
    this.key = key;
    this.endpoint = endpoint;
    this.instance = axios.create({
      baseURL: endpoint,
      headers: { Authorization: `Bearer ${key}` },
    });
  }

  /**
   * 유저 정보
   * @param userId User 고유 ID
   */
  async getUser(userId: string): Promise<User> {
    try {
      const res = await axios.get(`${this.endpoint}/users/${userId}`, { headers: { Authorization: `Bearer ${this.key}` } });

      return res.data.user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 유저 목록
   * @param offset 조회 시작 기준 번호
   * @param limit 조회 수
   * @param sortBy 정렬방식
   */
  async getUsers(offset: number, limit: number, sortBy: '+created_at' | '-created_at'): Promise<User[]> {
    try {
      const res = await axios.get(`${this.endpoint}/users?offset=${offset}&limit=${limit}&sort_by=${sortBy}`, {
        headers: { Authorization: `Bearer ${this.key}` },
      });

      return res.data.users;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 유저 생성
   * @param userId User 고유 ID
   * @param name User 이름
   * @param metadata 기타 데이터
   */
  async createUser(userId: string, name: string, metadata: Record<string, unknown> = {}): Promise<User> {
    try {
      const body = { user_id: userId, name, metadata };

      const res = await axios.post(`${this.endpoint}/users`, body, { headers: { Authorization: `Bearer ${this.key}` } });

      return res.data.user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 룸 정보
   * @param roomId 룸 ID
   */
  async getRoom(roomId: string): Promise<Room> {
    try {
      const res = await axios.get(`${this.endpoint}/rooms/${roomId}`, { headers: { Authorization: `Bearer ${this.key}` } });

      return res.data.room;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 룸 목록
   * @param offset 조회 시작 기준 번호
   * @param limit 조회 수
   * @param sortBy 정렬방식
   * @param is_terminated 종료되었는지 여부
   */
  async getRooms(offset: number, limit: number, sortBy: '+created_at' | '-created_at', isTerminated: boolean): Promise<Room[]> {
    try {
      const res = await axios.get(`${this.endpoint}/rooms?offset=${offset}&limit=${limit}&sort_by=${sortBy}&is_terminated=${isTerminated}`, {
        headers: { Authorization: `Bearer ${this.key}` },
      });

      return res.data.rooms;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 룸 생성
   * @param type 룸 타입
   * @param name 룸 이름
   * @param layoutId 레이아웃 ID
   * @param isDistinct 동일한 구성의 멤버들로 이루어진 룸이 있다면, 해당 룸으로 이동한다. (private 전용)
   * @param userIds 룸에 접속을 허용할 유저 목록 (private 전용)
   */
  async createRoom(type: RoomType, name: string, layoutId: string, isDistinct?: boolean, userIds?: string[]): Promise<Room> {
    try {
      const body = { type, name, layout_id: layoutId };

      isDistinct ? (body['is_distinct'] = isDistinct) : null;
      userIds ? (body['user_ids'] = userIds) : null;

      const res = await axios.post(`${this.endpoint}/rooms`, body, { headers: { Authorization: `Bearer ${this.key}` } });

      return res.data.room;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 룸 업데이트
   * * 현재는 종료만 가능
   * @param roomId 룸 ID
   * @param is_terminated 종료 상태
   */
  async updateRoom(roomId: string, isTerminated: boolean): Promise<{ room: Room; before: Room }> {
    try {
      const body = { is_terminated: isTerminated };

      const res = await axios.put(`${this.endpoint}/rooms/${roomId}`, body, { headers: { Authorization: `Bearer ${this.key}` } });

      return { room: res.data.room, before: res.data.before };
    } catch (e) {
      throw e;
    }
  }

  /**
   * Private 룸에 멤버 추가
   * @param roomId 룸 ID
   * @param userId User ID
   * @param options 추가 옵션
   * @param layoutId 레이아웃 ID
   */
  async addMember(roomId: string, userId: string, options?: Record<string, unknown>, layoutId?: string): Promise<Member> {
    try {
      const body = { user_id: userId };

      layoutId ? (body['layout_id'] = layoutId) : null;
      options ? (body['options'] = options) : null;

      const res = await axios.post(`${this.endpoint}/rooms/${roomId}/members`, body, { headers: { Authorization: `Bearer ${this.key}` } });

      return res.data.member;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 룸에 참가중인 멤버 목록
   * @param roomId 룸 ID
   * @param offset
   * @param limit
   */
  async getMembers(roomId: string, offset = 0, limit = 1000): Promise<Member[]> {
    try {
      const res = await axios.get(`${this.endpoint}/rooms/${roomId}/members?offset=${offset}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${this.key}` },
      });

      return res.data.members;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 룸에서 미팅을 진행 중인 멤버 목록
   * @param roomId 룸 ID
   */
  async getSessions(roomId: string, offset: number, limit: number): Promise<Session[]> {
    try {
      const res = await axios.get(`${this.endpoint}/rooms/${roomId}/sessions?is_connecting=true&offset=${offset}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${this.key}` },
      });

      return res.data.sessions;
    } catch (e) {
      throw e;
    }
  }
}

export const PCA = new PageCall(env.PAGECALL_API_KEY, 'https://api.pagecall.net/v1');
