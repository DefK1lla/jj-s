import { Translation } from "../model/interpreter.model";

export async function createTranslation(
  data_id: string,
  interpreter: object[]
) {
  try {
    const isDataExist = Translation.findOne({ data_id: data_id });

    if (isDataExist === null) {
      return new Error("Trnslation exist and it have to be unique");
    }

    const translation = new Translation({
      data_id: data_id,
      interpreter: interpreter,
    });

    return await translation.save();
  } catch (e) {
    console.log(interpreter);
    throw new Error("Can not save translation");
  }
}

export async function updateTranslation(
  data_id: string,
  interpreter: object[]
) {
  try {
    return await Translation.findOneAndUpdate(
      { data_id: data_id },
      { interpreter: interpreter }
    );
  } catch (e) {
    throw new Error("Can not update translation");
  }
}

export async function getTranslation(data_id: string) {
  try {
    return await Translation.findOne({ data_id: data_id });
  } catch (e) {
    throw new Error("Can not find translation");
  }
}

export async function deleteTranslation(id: string) {
  try {
    return await Translation.findByIdAndDelete(id);
  } catch (e) {
    throw new Error("Can not delete translation");
  }
}
