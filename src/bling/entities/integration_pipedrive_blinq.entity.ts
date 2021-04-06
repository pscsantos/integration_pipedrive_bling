import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('integration_pipedrive_blinq')
export class IntegrationPipedriveBlinq {

  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  date: Date;

  @Column()
  amount: number;
}