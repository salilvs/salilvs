USE [bookittest]
GO
/****** Object:  StoredProcedure [dbo].[sp_authentication]    Script Date: 24-11-2020 11:47:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_authentication] 
	-- Add the parameters for the stored procedure here
	@username nvarchar(250),
	@password nvarchar(250)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @response TABLE (Type nvarchar(150), Title nvarchar(150), Message nvarchar(150), Url nvarchar(150));
	DECLARE @Loginresponse TABLE (Type nvarchar(240), User_Photo nvarchar(max), User_Name nvarchar(350), User_Role nvarchar(150), User_LoginId nvarchar(250), Login_Type nvarchar(150));
	DECLARE @response_Type nvarchar(150), 
			@response_Title nvarchar(150), 
			@response_Message nvarchar(150), 
			@response_Url nvarchar(150);
	DECLARE @JsonResult nvarchar(MAX);
    -- Insert statements for procedure here
	IF(LEN(@username) > 0 AND LEN(@password) > 0)
	BEGIN
		IF EXISTS(Select Id, Name, Role, Photo from tbl_superadmins where Username = @username and Password = @password)
		BEGIN
				INSERT INTO @Loginresponse SELECT 'Success', Photo, Name, Role, Id, 'Platform' from tbl_superadmins where Username = @username and Password = @password;
				SELECT * from @Loginresponse;
		END
		ELSE IF EXISTS(Select Login_User_Id from tbl_login where Login_Password = @password and  Login_Username_1 = @username or Login_Username_2 = @username)
		BEGIN
			IF EXISTS(Select Login_User_Id from tbl_login where Login_Status = 'Active' and Login_Type = 'Platform' and Login_Password = @password and  Login_Username_1 = @username or Login_Username_2 = @username)
			BEGIN
				IF EXISTS(Select Login_User_Id from tbl_login where Login_Password_Changed = 'Changed' and Login_Password = @password and  Login_Username_1 = @username or Login_Username_2 = @username)
				BEGIN
					INSERT INTO @Loginresponse SELECT 'Success', pe.Employee_Photo, pe.Employee_Name, pe.Employee_Role, l.Login_User_Id, l.Login_Type from tbl_employee pe
												INNER JOIN tbl_login l on l.Login_User_Id = pe.Employee_Uniqueid and l.Login_Password = @password and  l.Login_Username_1 = @username or l.Login_Username_2 = @username;
					SELECT * from @Loginresponse;
				END
				ELSE
				BEGIN
					SET @response_Type = 'Warning';
					SET @response_Title = 'Please change password';
					SET @response_Message = 'Please change your password to continoue';
					SET @response_Url = '';
					INSERT INTO @response VALUES (@response_Type, @response_Title, @response_Message, @response_Url);
					Select * from @response;
				END
			END
			ELSE IF EXISTS(Select Login_User_Id from tbl_login where Login_Status = 'Active' and Login_Type = 'Vendor' and Login_Password = @password and  Login_Username_1 = @username or Login_Username_2 = @username)
			BEGIN
			PRINT 'Hai'
				IF EXISTS(Select Login_User_Id from tbl_login where Login_Password_Changed = 'Changed' and Login_Password = @password and  Login_Username_1 = @username or Login_Username_2 = @username)
				BEGIN
					INSERT INTO @Loginresponse SELECT 'Success', v.Vendor_Photo, v.Vendor_Name, l.Login_Role, l.Login_User_Id, l.Login_Type from tbl_vendor v
												INNER JOIN tbl_login l on l.Login_User_Id = v.Vendor_uniqueid and l.Login_Password = @password and  l.Login_Username_1 = @username or l.Login_Username_2 = @username;
					SELECT * from @Loginresponse;
				END
				ELSE
				BEGIN
					SET @response_Type = 'Warning';
					SET @response_Title = 'Please change password';
					SET @response_Message = 'Please change your password to continoue';
					SET @response_Url = '';
					INSERT INTO @response VALUES (@response_Type, @response_Title, @response_Message, @response_Url);
					Select * from @response;
				END
			END


				ELSE IF EXISTS(Select Login_User_Id from tbl_login where Login_Status = 'Active' and Login_Type = 'Vendor_Employee' and Login_Password = @password and  Login_Username_1 = @username or Login_Username_2 = @username)
			BEGIN
			PRINT 'Hai 1'
				IF EXISTS(Select Login_User_Id from tbl_login where Login_Password_Changed = 'Changed' and Login_Password = @password and  Login_Username_1 = @username or Login_Username_2 = @username)
				BEGIN
				    INSERT INTO @Loginresponse SELECT 'Success', v.Vendor_Employee_Photo, v.Vendor_Employee_Name, l.Login_Role, l.Login_User_Id, l.Login_Type from tbl_vendoremployee v
												INNER JOIN tbl_login l on l.Login_User_Id = v.Vendor_Employee_Uniqueid and l.Login_Password = @password and  l.Login_Username_1 = @username or l.Login_Username_2 = @username;
					
					SELECT * from @Loginresponse;
				END
				ELSE
				BEGIN
					SET @response_Type = 'Warning';
					SET @response_Title = 'Please change password';
					SET @response_Message = 'Please change your password to continoue';
					SET @response_Url = '';
					INSERT INTO @response VALUES (@response_Type, @response_Title, @response_Message, @response_Url);
					Select * from @response;
				END
			END

			ELSE
			BEGIN
				SET @response_Type = 'Invalid';
				SET @response_Title = 'Please Contact';
				SET @response_Message = 'Please contact the bookit administrative office';
				SET @response_Url = '';
				INSERT INTO @response VALUES (@response_Type, @response_Title, @response_Message, @response_Url);
				Select * from @response;
			END
		END




		ELSE
		BEGIN
			SET @response_Type = 'Invalid';
			SET @response_Title = 'Invalid';
			SET @response_Message = 'Invalid Username or Password';
			SET @response_Url = '';
			INSERT INTO @response VALUES (@response_Type, @response_Title, @response_Message, @response_Url);
			Select * from @response;
		END
	END
END
GO
