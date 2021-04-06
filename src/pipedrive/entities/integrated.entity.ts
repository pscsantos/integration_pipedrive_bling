import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('integrateds')
export class Integrateds {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  businessId: number;

}